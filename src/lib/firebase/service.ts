import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where, WhereFilterOp } from "firebase/firestore";
import app from "./init";

// In-memory cache to prevent duplicate queries and optimize server response times
const memoryCache = new Map<string, { timestamp: number; data: any }>();
const CACHE_TTL_MS = 60 * 1000; // 60 seconds TTL

function getDb() {
    return getFirestore(app);
}

export async function retrieveData(collectionName: string) {
    if (!process.env.FIREBASE_PROJECT_ID) {
        return [];
    }

    const cacheKey = `collection_${collectionName}`;
    const cached = memoryCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
        return cached.data;
    }

    try {
        const snapshot = await getDocs(collection(getDb(), collectionName));
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        memoryCache.set(cacheKey, { timestamp: Date.now(), data });
        return data;
    } catch (error) {
        console.error(`Error in retrieveData(${collectionName}):`, error);
        return [];
    }
}

export async function retrieveDataById(collectionName: string, id: string) {
    if (!process.env.FIREBASE_PROJECT_ID) {
        return null;
    }

    const cacheKey = `doc_${collectionName}_${id}`;
    const cached = memoryCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
        return cached.data;
    }

    try {
        const snapshot = await getDoc(doc(getDb(), collectionName, id));
        if (!snapshot.exists()) return null;
        const data = {
            id: snapshot.id,
            ...snapshot.data(),
        };
        memoryCache.set(cacheKey, { timestamp: Date.now(), data });
        return data;
    } catch (error) {
        console.error(`Error in retrieveDataById(${collectionName}, ${id}):`, error);
        return null;
    }
}

export async function retrieveDataByQuery(collectionName: string, field: string, operator: WhereFilterOp, value: any) {
    if (!process.env.FIREBASE_PROJECT_ID) {
        return [];
    }

    const cacheKey = `query_${collectionName}_${field}_${operator}_${String(value)}`;
    const cached = memoryCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
        return cached.data;
    }

    try {
        const q = query(collection(getDb(), collectionName), where(field, operator, value));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        memoryCache.set(cacheKey, { timestamp: Date.now(), data });
        return data;
    } catch (error) {
        console.error(`Error in retrieveDataByQuery(${collectionName}, ${field}, ${operator}, ${value}):`, error);
        return [];
    }
}

export async function addData(collectionName: string, data: any) {
    if (!process.env.FIREBASE_PROJECT_ID) {
        throw new Error("FIREBASE_PROJECT_ID is not configured");
    }

    try {
        const docRef = await addDoc(collection(getDb(), collectionName), {
            ...data,
            createdAt: data.createdAt || new Date().toISOString(),
        });

        // Invalidate in-memory cache for this collection
        memoryCache.delete(`collection_${collectionName}`);

        return {
            id: docRef.id,
            ...data,
        };
    } catch (error) {
        console.error(`Error in addData(${collectionName}):`, error);
        throw error;
    }
}
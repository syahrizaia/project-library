const Footer = () => {
    return (
        <>
            <div className="bg-cyan-200 flex justify-center items-start flex-col sm:flex-row gap-6 sm:gap-20 rounded-tr-2xl sm:rounded-tr-3xl rounded-tl-2xl sm:rounded-tl-3xl p-6">
                <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-2xl">Perpustakaan WIR</h1>
                    <h2 className="font-semibold text-xl">Jam operasional layanan</h2>
                    <ul>
                        <li>&gt; Senin - Jumat : 08.00-16.00</li>
                        <li>&gt; Sabtu - Minggu : 09.00-15.00</li>
                        <li>&gt; Cuti bersama dan libur nasional <strong>tutup</strong></li>
                    </ul>
                    <p>Maksimal pengunjung 2000 Perhari</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="font-semibold text-xl">Koleksi Unggulan</h1>
                    <ul>
                        <li>&gt; Novel</li>
                        <li>&gt; Komik</li>
                        <li>&gt; Buku pelajaran</li>
                        <li>&gt; Pemrograman</li>
                        <li>&gt; Sains</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="font-semibold text-xl">Kontak kami</h1>
                    <h2 className="font-semibold">Telpon</h2>
                    <p>0895-2973-8778</p>
                    <h2 className="font-semibold">Email</h2>
                    <p>wir@gmail.com</p>
                    <h2 className="font-semibold">Alamat</h2>
                    <p>Wakanda cabang Cikarang. 17845</p>
                </div>
            </div>
            <>
                <p className="bg-cyan-600 text-white text-center p-2">Copyright &copy; All Right Reserved 2023. Team 3</p>
            </>
        </>
    )
}

export default Footer;
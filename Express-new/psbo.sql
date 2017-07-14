-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 31 Mei 2017 pada 10.04
-- Versi Server: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `psbo`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `departemen`
--

CREATE TABLE `departemen` (
  `id_departemen` int(11) NOT NULL,
  `nama_departemen` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `departemen`
--

INSERT INTO `departemen` (`id_departemen`, `nama_departemen`) VALUES
(1, 'Statistika'),
(2, 'Geofisika dan Meteorologi'),
(3, 'Biologi'),
(4, 'Kimia'),
(5, 'Matematika'),
(6, 'Ilmu Komputer'),
(7, 'Fisika'),
(8, 'Biokimia');

-- --------------------------------------------------------

--
-- Struktur dari tabel `klasemen`
--

CREATE TABLE `klasemen` (
  `id_departemen` int(11) NOT NULL,
  `emas` tinyint(1) NOT NULL,
  `perak` tinyint(1) NOT NULL,
  `perunggu` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `lomba`
--

CREATE TABLE `lomba` (
  `id_lomba` int(11) NOT NULL,
  `nama_lomba` varchar(15) NOT NULL,
  `kategori_lomba` int(11) NOT NULL,
  `tipe_lomba` varchar(15) NOT NULL,
  `minimal_peserta` int(10) NOT NULL,
  `maximal_peserta` int(10) NOT NULL,
  `juaraI_lomba` int(11) NOT NULL,
  `juaraII_lomba` int(11) NOT NULL,
  `juaraIII_lomba` int(11) NOT NULL,
  `pj_lomba` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `lomba`
--

INSERT INTO `lomba` (`id_lomba`, `nama_lomba`, `kategori_lomba`, `tipe_lomba`, `minimal_peserta`, `maximal_peserta`, `juaraI_lomba`, `juaraII_lomba`, `juaraIII_lomba`, `pj_lomba`) VALUES
(1, 'futsal', 0, 'bola besar', 7, 10, 0, 0, 0, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `id_mahasiswa` int(11) NOT NULL,
  `nama_mahasiswa` varchar(30) NOT NULL,
  `nim_mahasiswa` varchar(30) NOT NULL,
  `jumlah_lomba` int(11) NOT NULL,
  `fkdepartement_mahasiswa` int(11) NOT NULL,
  `tingkat_mahasiswa` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `mahasiswa`
--

INSERT INTO `mahasiswa` (`id_mahasiswa`, `nama_mahasiswa`, `nim_mahasiswa`, `jumlah_lomba`, `fkdepartement_mahasiswa`, `tingkat_mahasiswa`) VALUES
(1, 'Parhan Zikkry Padly', 'G64140011', 1, 6, 0),
(2, 'Miqdad Abdurrahman Fawwaz', 'G64140031', 2, 6, 0),
(3, 'Reza Bagus Permana', 'G64140023', 1, 6, 0),
(4, 'Rizki Ananda Utama', 'G64140030', 1, 6, 0),
(5, 'Rizki Ananda Utama', 'G64140030', 1, 6, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `panitia`
--

CREATE TABLE `panitia` (
  `id_panitia` int(11) NOT NULL,
  `email_panitia` varchar(50) NOT NULL,
  `divisi_panitia` int(11) NOT NULL,
  `ketua_divisi_panitia` tinyint(1) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `panitia`
--

INSERT INTO `panitia` (`id_panitia`, `email_panitia`, `divisi_panitia`, `ketua_divisi_panitia`, `username`, `password`, `status`) VALUES
(1, 'parhanzikkry@gmail.com', 1, 0, 'parhanzikkry', '1234', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `panitia_divisi`
--

CREATE TABLE `panitia_divisi` (
  `id_divisi` int(11) NOT NULL,
  `nama_divisi` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `panitia_divisi`
--

INSERT INTO `panitia_divisi` (`id_divisi`, `nama_divisi`) VALUES
(1, 'BPH');

-- --------------------------------------------------------

--
-- Struktur dari tabel `penanggung_jawab`
--

CREATE TABLE `penanggung_jawab` (
  `id_penanggung_jawab` int(11) NOT NULL,
  `id_departemen` int(11) NOT NULL,
  `no_telepon1` varchar(20) NOT NULL,
  `no_telepon2` varchar(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `email` varchar(50) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `penanggung_jawab`
--

INSERT INTO `penanggung_jawab` (`id_penanggung_jawab`, `id_departemen`, `no_telepon1`, `no_telepon2`, `username`, `password`, `email`, `status`) VALUES
(1, 1, '081284929918', '182763378899', 'pj_stk', '6dc8d13fb35b02b19708165cb265780b', 'rezabaguspermana.rbp@gmail.com', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `pertandingan`
--

CREATE TABLE `pertandingan` (
  `id_pertandingan` int(11) NOT NULL,
  `id_lomba` int(11) NOT NULL,
  `hari_pertandingan` varchar(10) NOT NULL,
  `waktu_pertandinga` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `tempat_pertandingan` text NOT NULL,
  `kontingen1_pertandingan` int(11) NOT NULL,
  `kontingen2_pertandingan` int(11) NOT NULL,
  `jenis_pertandingan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `peserta`
--

CREATE TABLE `peserta` (
  `id_peserta` int(11) NOT NULL,
  `idmahasiswa_peserta` int(11) NOT NULL,
  `photo_peserta` text NOT NULL,
  `photo_ktm_peserta` text,
  `no_hp_peserta` varchar(20) DEFAULT NULL,
  `idlomba_peserta` int(11) NOT NULL,
  `status_peserta` tinyint(1) DEFAULT NULL,
  `keterangan_perserta` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `peserta`
--

INSERT INTO `peserta` (`id_peserta`, `idmahasiswa_peserta`, `photo_peserta`, `photo_ktm_peserta`, `no_hp_peserta`, `idlomba_peserta`, `status_peserta`, `keterangan_perserta`) VALUES
(1, 3, 'public\\images\\ziqkflb564tbrr90ms4i.jpg', 'public\\images\\43u81zxixf5ga3piudi.jpg', NULL, 1, 0, NULL),
(2, 2, 'public\\images\\5hdjf4figd7z2y1a714i.jpg', 'public\\images\\r7skr1uahrzn8pcmu0udi.jpg', NULL, 1, 0, NULL),
(3, 1, 'public\\images\\c1tjijznndt53hht1emi.jpg', 'public\\images\\ingsw7x3ceqwmfv42t9.jpg', NULL, 1, 0, NULL),
(4, 4, 'public\\images\\ppzzl8ufpimmsa714i.png', 'public\\images\\wh144uvfcy87p5txogvi.jpg', NULL, 1, 0, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `verifikasi_berkas`
--

CREATE TABLE `verifikasi_berkas` (
  `id_peserta` int(11) NOT NULL,
  `id_panitia` int(11) NOT NULL,
  `status_verifikasi` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `departemen`
--
ALTER TABLE `departemen`
  ADD PRIMARY KEY (`id_departemen`);

--
-- Indexes for table `lomba`
--
ALTER TABLE `lomba`
  ADD PRIMARY KEY (`id_lomba`);

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`id_mahasiswa`);

--
-- Indexes for table `panitia`
--
ALTER TABLE `panitia`
  ADD PRIMARY KEY (`id_panitia`);

--
-- Indexes for table `panitia_divisi`
--
ALTER TABLE `panitia_divisi`
  ADD PRIMARY KEY (`id_divisi`);

--
-- Indexes for table `penanggung_jawab`
--
ALTER TABLE `penanggung_jawab`
  ADD PRIMARY KEY (`id_penanggung_jawab`);

--
-- Indexes for table `pertandingan`
--
ALTER TABLE `pertandingan`
  ADD PRIMARY KEY (`id_pertandingan`);

--
-- Indexes for table `peserta`
--
ALTER TABLE `peserta`
  ADD PRIMARY KEY (`id_peserta`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `departemen`
--
ALTER TABLE `departemen`
  MODIFY `id_departemen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `lomba`
--
ALTER TABLE `lomba`
  MODIFY `id_lomba` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  MODIFY `id_mahasiswa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `panitia`
--
ALTER TABLE `panitia`
  MODIFY `id_panitia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `panitia_divisi`
--
ALTER TABLE `panitia_divisi`
  MODIFY `id_divisi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `penanggung_jawab`
--
ALTER TABLE `penanggung_jawab`
  MODIFY `id_penanggung_jawab` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `pertandingan`
--
ALTER TABLE `pertandingan`
  MODIFY `id_pertandingan` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `peserta`
--
ALTER TABLE `peserta`
  MODIFY `id_peserta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

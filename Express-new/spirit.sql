-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2017 at 07:08 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `spirit`
--

-- --------------------------------------------------------

--
-- Table structure for table `departemen`
--

CREATE TABLE `departemen` (
  `id_departemen` int(11) NOT NULL,
  `nama_departemen` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `departemen`
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
-- Table structure for table `klasemen`
--

CREATE TABLE `klasemen` (
  `id_departemen` int(11) NOT NULL,
  `id_lomba` int(11) NOT NULL,
  `emas` tinyint(1) NOT NULL,
  `perak` tinyint(1) NOT NULL,
  `perunggu` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `lomba`
--

CREATE TABLE `lomba` (
  `id_lomba` int(11) NOT NULL,
  `nama_lomba` varchar(15) NOT NULL,
  `kategori_lomba` int(11) NOT NULL,
  `tipe_lomba` varchar(15) NOT NULL,
  `minimal_peserta` int(10) NOT NULL,
  `maximal_peserta` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `id_mahasiswa` int(11) NOT NULL,
  `nama_mahasiswa` varchar(30) NOT NULL,
  `nim_mahasiswa` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `panitia`
--

CREATE TABLE `panitia` (
  `id_panitia` int(11) NOT NULL,
  `email_panitia` varchar(50) NOT NULL,
  `divisi_panitia` int(11) NOT NULL,
  `ketua_divisi_panitia` tinyint(1) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `panitia_divisi`
--

CREATE TABLE `panitia_divisi` (
  `id_divisi` int(11) NOT NULL,
  `nama_divisi` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `penanggung_jawab`
--

CREATE TABLE `penanggung_jawab` (
  `id_penanggung_jawab` int(11) NOT NULL,
  `id_departemen` int(11) NOT NULL,
  `no_telepon1` varchar(20) NOT NULL,
  `no_telepon2` varchar(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `penanggung_jawab`
--

INSERT INTO `penanggung_jawab` (`id_penanggung_jawab`, `id_departemen`, `no_telepon1`, `no_telepon2`, `username`, `password`) VALUES
(1, 1, '081284929918', '182763378899', 'pj_stk', '1234'),
(2, 1, '081284929918', '182763378899', 'pj_stk', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `pertandingan`
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
-- Table structure for table `peserta`
--

CREATE TABLE `peserta` (
  `id_peserta` int(11) NOT NULL,
  `photo_peserta` text NOT NULL,
  `photo_ktm_peserta` text NOT NULL,
  `no_hp_peserta` varchar(20) NOT NULL,
  `id_lomba` int(11) NOT NULL,
  `jumlah_lomba` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `verifikasi_berkas`
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
  MODIFY `id_lomba` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  MODIFY `id_mahasiswa` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `panitia_divisi`
--
ALTER TABLE `panitia_divisi`
  MODIFY `id_divisi` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `penanggung_jawab`
--
ALTER TABLE `penanggung_jawab`
  MODIFY `id_penanggung_jawab` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `pertandingan`
--
ALTER TABLE `pertandingan`
  MODIFY `id_pertandingan` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `peserta`
--
ALTER TABLE `peserta`
  MODIFY `id_peserta` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

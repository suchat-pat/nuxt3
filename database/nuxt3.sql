-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Jan 13, 2026 at 07:40 AM
-- Server version: 9.5.0
-- PHP Version: 8.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nuxt3`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_eva`
--

CREATE TABLE `tb_eva` (
  `id_eva` int NOT NULL,
  `id_member` int NOT NULL,
  `id_sys` int NOT NULL,
  `status_eva` int NOT NULL,
  `total_eva` double(10,2) DEFAULT NULL,
  `total_commit` double(10,2) DEFAULT NULL,
  `day_eva` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_eva`
--

INSERT INTO `tb_eva` (`id_eva`, `id_member`, `id_sys`, `status_eva`, `total_eva`, `total_commit`, `day_eva`) VALUES
(1, 2, 1, 1, NULL, NULL, '2026-01-13');

-- --------------------------------------------------------

--
-- Table structure for table `tb_evadetail`
--

CREATE TABLE `tb_evadetail` (
  `id_eva` int NOT NULL,
  `id_indicate` int NOT NULL,
  `status_eva` int NOT NULL,
  `score_member` int DEFAULT NULL,
  `score_commit` int DEFAULT NULL,
  `detail_eva` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `file_eva` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_indicate`
--

CREATE TABLE `tb_indicate` (
  `id_indicate` int NOT NULL,
  `id_topic` int NOT NULL,
  `name_indicate` varchar(100) NOT NULL,
  `point_indicate` int NOT NULL,
  `detail_indicate` text NOT NULL,
  `check_indicate` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_indicate`
--

INSERT INTO `tb_indicate` (`id_indicate`, `id_topic`, `name_indicate`, `point_indicate`, `detail_indicate`, `check_indicate`) VALUES
(1, 1, 'aaaa', 5, 'qqqqq', 'y'),
(2, 1, 'qqqq', 5, 'qqqqaaaa', 'n'),
(3, 2, 'ssss', 5, 'ssswww', 'n'),
(4, 2, 'wwwww', 5, 'wwwsss', 'y');

-- --------------------------------------------------------

--
-- Table structure for table `tb_member`
--

CREATE TABLE `tb_member` (
  `id_member` int NOT NULL,
  `first_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('ฝ่ายบุคลากร','กรรมการประเมิน','ผู้รับการประเมินผล') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_member`
--

INSERT INTO `tb_member` (`id_member`, `first_name`, `last_name`, `email`, `username`, `password`, `role`) VALUES
(1, 'aaaa', 'aaaa', 'aaaa@gmail.com', 'aaaa', '$2b$10$BXp6brHgONat0E80Z2h7MOQf.KdTHfX1DnyYwvdQevC4NrYiSGpO6', 'ฝ่ายบุคลากร'),
(2, 'eeee55', 'eeee55', 'eeee@gmail.com', 'eeee', '$2b$10$neAp93IsPHnvueII0xRogulwL.BupyiKBic3NehlvzLKA2KT1ShRq', 'ผู้รับการประเมินผล');

-- --------------------------------------------------------

--
-- Table structure for table `tb_system`
--

CREATE TABLE `tb_system` (
  `id_sys` int NOT NULL,
  `day_open` date NOT NULL,
  `day_out` date NOT NULL,
  `round_sys` varchar(10) NOT NULL,
  `year_sys` varchar(4) NOT NULL,
  `status_sys` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_system`
--

INSERT INTO `tb_system` (`id_sys`, `day_open`, `day_out`, `round_sys`, `year_sys`, `status_sys`) VALUES
(1, '2026-01-13', '2026-01-17', '1', '2568', 'y');

-- --------------------------------------------------------

--
-- Table structure for table `tb_topic`
--

CREATE TABLE `tb_topic` (
  `id_topic` int NOT NULL,
  `name_topic` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tb_topic`
--

INSERT INTO `tb_topic` (`id_topic`, `name_topic`) VALUES
(1, 'aaaqqqq'),
(2, 'sssswwww');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_eva`
--
ALTER TABLE `tb_eva`
  ADD PRIMARY KEY (`id_eva`);

--
-- Indexes for table `tb_indicate`
--
ALTER TABLE `tb_indicate`
  ADD PRIMARY KEY (`id_indicate`);

--
-- Indexes for table `tb_member`
--
ALTER TABLE `tb_member`
  ADD PRIMARY KEY (`id_member`);

--
-- Indexes for table `tb_system`
--
ALTER TABLE `tb_system`
  ADD PRIMARY KEY (`id_sys`);

--
-- Indexes for table `tb_topic`
--
ALTER TABLE `tb_topic`
  ADD PRIMARY KEY (`id_topic`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_eva`
--
ALTER TABLE `tb_eva`
  MODIFY `id_eva` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_indicate`
--
ALTER TABLE `tb_indicate`
  MODIFY `id_indicate` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tb_member`
--
ALTER TABLE `tb_member`
  MODIFY `id_member` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_system`
--
ALTER TABLE `tb_system`
  MODIFY `id_sys` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_topic`
--
ALTER TABLE `tb_topic`
  MODIFY `id_topic` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

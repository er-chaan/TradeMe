-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 15, 2019 at 12:20 AM
-- Server version: 10.1.37-MariaDB-3
-- PHP Version: 7.2.4-1+b2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `TradeMe`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `description` text NOT NULL,
  `debit` float NOT NULL DEFAULT '0',
  `credit` float NOT NULL DEFAULT '0',
  `balance` float NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `mobile`, `date`, `description`, `debit`, `credit`, `balance`, `status`) VALUES
(5, '9004313006', '2019-10-14 18:20:45', 'payin 10 processed ', 0, 10, 10, 'payin'),
(6, '9004313006', '2019-10-14 18:29:18', 'payin 15 processed ', 0, 15, 25, 'payin'),
(7, '9004313006', '2019-10-14 18:34:09', 'payout 5 processed ', 5, 0, 20, 'payout'),
(8, '9004313006', '2019-10-14 18:34:45', 'payout 20 processed ', 20, 0, 0, 'payout'),
(9, '9004313006', '2019-10-14 18:45:57', 'payin 100 processed ', 0, 100, 100, 'payin'),
(10, '9004313006', '2019-10-14 18:48:41', 'payin 990 processed ', 0, 990, 1090, 'payin');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `mobile` varchar(10) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` text,
  `token` text,
  `balance` float DEFAULT '0',
  `lastUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `mobile`, `email`, `password`, `token`, `balance`, `lastUpdated`, `status`) VALUES
(67, '9004313006', 'er.chandreshbhai@gmail.com', '16f6ee333087cc134afc201236048cd5', '168d65b478f8d6e2dc61e57134394ca7ab967484', 1090, '2019-10-14 18:48:41', 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mobile` (`mobile`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

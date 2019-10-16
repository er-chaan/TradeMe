-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 17, 2019 at 12:21 AM
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
(26, '9004313006', '2019-10-16 18:47:29', 'payin 1000 processed ', 0, 1000, 1000, 'payin'),
(27, '9004313006', '2019-10-16 18:47:49', ' BUY SOUTHBANK of quantity 20 at 10.00', 200, 0, 800, 'payout'),
(28, '9004313006', '2019-10-16 18:48:23', ' SELL IDFCFIRSTB of quantity 10 at 39.20', 392, 0, 408, 'payout');

-- --------------------------------------------------------

--
-- Table structure for table `inplay`
--

CREATE TABLE `inplay` (
  `id` int(11) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `symbol` text NOT NULL,
  `called` text NOT NULL,
  `price` float NOT NULL,
  `quantity` int(11) NOT NULL,
  `cmp` float DEFAULT '0',
  `net` float NOT NULL DEFAULT '0',
  `lastUpdated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `inplay`
--

INSERT INTO `inplay` (`id`, `mobile`, `symbol`, `called`, `price`, `quantity`, `cmp`, `net`, `lastUpdated`, `status`) VALUES
(20, '9004313006', 'SOUTHBANK', 'buy', 10, 20, 10, 0, '2019-10-16 18:48:01', 'open'),
(21, '9004313006', 'IDFCFIRSTB', 'sell', 39.2, 10, 39.2, 0, '2019-10-16 18:48:29', 'open');

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
(68, '9004313006', 'er.chandreshbhai@gmail.com', '22e605e3f8a8f5b12969bf01a1313b14', 'bb1e1f1de002ff3f935b2521404b24fc38a7e538', 408, '2019-10-16 18:48:23', 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inplay`
--
ALTER TABLE `inplay`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `inplay`
--
ALTER TABLE `inplay`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

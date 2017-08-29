-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th8 29, 2017 lúc 08:37 PM
-- Phiên bản máy phục vụ: 10.1.25-MariaDB
-- Phiên bản PHP: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `pharmacy`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `phonenumber` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `customers`
--

INSERT INTO `customers` (`id`, `email`, `password`, `address`, `fullname`, `phonenumber`) VALUES
(1, 'admin@pharmacy.com', 'lamquang', '1', '2', '3'),
(4, 'lamquanguit@gmail.com', 'lamquang12', 'Sài Gòn', 'Lâm Quang', '1346987654'),
(5, 'lamquang123@gmail.com', 'lamquang123', 'H? Chí Minh', 'Lâm Quang', '0963225057'),
(6, 'lamquang1234@gmail.com', 'lamquang123', 'H? Chí Minh', 'Lâm Quang', '0963225057'),
(7, 'lamquang12345@gmail.com', 'lamquang123', 'H? Chí Minh', 'Lâm Quang', '0963225057'),
(8, 'lamquang123456@gmail.com', 'lamquang123', 'H? Chí Minh', 'Lâm Quang', '0963225057'),
(9, 'lamquang1234567@gmail.com', 'lamquang123', 'H? Chí Minh', 'Lâm Quang', '0963225057'),
(10, 'lamquang1234568@gmail.com', 'lamquang123', 'H? Chí Minh', 'Lâm Quang', '0963225057'),
(11, 'lamquang2@gmail.com', 'lamquang123', 'H? Chí Minh', 'Lâm Quang', '096322505712'),
(12, 'lamquang3@gmail.com', 'lamquang123', 'H? Chí Minh', 'Lâm Quang', '096322505712'),
(13, 'lamquang4@gmail.com', 'lamquang123', 'H? Chí Minh', 'Lâm Quang', '096322505712');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `drug`
--

CREATE TABLE `drug` (
  `id` int(11) NOT NULL,
  `name` varchar(150) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `instructions` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `formula` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `contraindication` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `side_effect` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `how_to_use` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `drug`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `drugorder`
--

CREATE TABLE `drugorder` (
  `id` int(11) NOT NULL,
  `customer` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `total_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orderdetail`
--

CREATE TABLE `orderdetail` (
  `id` int(11) NOT NULL,
  `id_order` int(11) NOT NULL,
  `id_drug` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `drug`
--
ALTER TABLE `drug`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `drugorder`
--
ALTER TABLE `drugorder`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT cho bảng `drug`
--
ALTER TABLE `drug`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT cho bảng `drugorder`
--
ALTER TABLE `drugorder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `orderdetail`
--
ALTER TABLE `orderdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

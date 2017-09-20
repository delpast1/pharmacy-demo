-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th9 20, 2017 lúc 09:30 PM
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
-- Cấu trúc bảng cho bảng `drug`
--

CREATE TABLE `drug` (
  `id` int(11) NOT NULL,
  `name` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `drug`
--

INSERT INTO `drug` (`id`, `name`) VALUES
(1, 'Diphtheria/Tetanus/Pertussis(acellular component)/Hepatitis B(surface antigen)/Poliomyelitis(inactivated)/Haemophilus type b conjugate vaccine (adsorbed) powder and suspension for suspension for injection 0.5ml pre-filled syringes 1 pre-filled disposable injection'),
(2, 'Betacarotene 30mg tablets 1 tablet'),
(3, 'Amiodarone 150mg/3ml solution for injection ampoules 5 ampoule'),
(4, 'Sulfinpyrazone 200mg tablets 100 tablet'),
(5, 'Bupivacaine 25mg/10ml (0.25%) solution for injection vials 10 vial'),
(6, 'Histamine phosphate 4mg/ml nebuliser liquid 10ml bottles 1 bottle'),
(7, 'Coal tar solution strong 6% in Yellow soft paraffin 1 gram'),
(8, 'Generic Udderly Smooth Extra Care cream with 10% urea 227 gram'),
(9, 'Generic Mextra Superabsorbent dressing 17.5cm x 22.5cm rectangular 10 dressing'),
(10, 'Clonidine 3.75micrograms/5ml oral suspension 1 ml'),
(11, 'Coal tar 2% in Aqueous cream 1 gram'),
(12, 'Betamethasone valerate 0.1% ointment 30% / Coal tar solution 5% in Yellow soft paraffin 1 gram'),
(13, 'Propylene glycol 20% / Lactic acid 3% in Generic Unguentum M cream 1 gram'),
(14, 'Cefixime 400mg tablets 7 tablet'),
(15, 'Warfarin 1mg tablets 100 tablet'),
(16, 'Generic Dubam spray 150 ml'),
(17, 'Dexpanthenol 5% ointment 50 gram'),
(18, 'Chloramphenicol 0.5% eye drops preservative free 10 ml'),
(19, 'Generic Foodlink Complete Starter Pack powder 285 gram'),
(20, 'Flucloxacillin 2g powder for solution for injection vials 1 vial'),
(21, 'Atosiban 6.75mg/0.9ml solution for injection ampoules 1 ampoule'),
(22, 'Fluconazole 400mg/200ml infusion bags 5 bag'),
(23, 'Cyproterone 100mg tablets 80 tablet'),
(24, 'Adenosine 120mg/120ml infusion bags 10 bag'),
(25, 'Blood glucose biosensor testing strips 100 strip'),
(26, 'Levocarnitine 1.5g/5ml oral solution paediatric 40 ml'),
(27, 'Generic HirudoSalt powder 5 gram'),
(28, 'Generic Leech Nosda kit 1 kit'),
(29, 'Sarilumab 200mg/1.14ml solution for injection pre-filled disposable devices 2 pre-filled disposable injection'),
(30, 'Sarilumab 150mg/1.14ml solution for injection pre-filled disposable devices 2 pre-filled disposable injection'),
(31, 'Sarilumab 200mg/1.14ml solution for injection pre-filled syringes 2 pre-filled disposable injection'),
(32, 'Sarilumab 150mg/1.14ml solution for injection pre-filled syringes 2 pre-filled disposable injection'),
(33, 'Patiromer calcium 16.8g oral powder sachets 30 sachet'),
(34, 'Patiromer calcium 8.4g oral powder sachets 30 sachet'),
(35, 'Lidocaine 7.5mg/actuation / Prilocaine 2.5mg/actuation cutaneous spray 5 ml'),
(36, 'Fluoxetine 10mg tablets 30 tablet'),
(37, 'Raltegravir 600mg tablets 60 tablet'),
(38, 'Nusinersen 12mg/5ml solution for injection vials 1 vial'),
(39, 'Bivalirudin 250mg powder for solution for infusion vials 1 vial'),
(40, 'Generic Maalox Plus oral suspension sugar free 250 ml'),
(41, 'Co-magaldrox 175mg/200mg/5ml oral suspension sugar free 250 ml'),
(42, 'Generic VisuXL eye drops preservative free 10 ml'),
(43, 'Pregabalin 20mg/ml oral solution sugar free 500 ml'),
(44, 'Generic Optase Moist Heat Mask eye compress 1 device'),
(45, 'Generic Oralieve moisturising mouth spray sugar free 50 ml'),
(46, 'Generic Epaderm cream 150 gram'),
(47, 'Sodium chloride 0.9% inhalation solution 2.5ml vials 20 vial'),
(48, 'Eltrombopag 75mg tablets 28 tablet'),
(49, 'Ethinylestradiol 30microgram / Drospirenone 3mg tablets 21 tablet'),
(50, 'Histamine phosphate 2mg/ml nebuliser liquid 10ml bottles 1 bottle'),
(51, 'Histamine phosphate 1mg/ml nebuliser liquid 10ml bottles 1 bottle'),
(52, 'Fragaria vesca 40mg / Vitis vinifera 40mg tablets 80 tablet'),
(53, 'Proguanil 100mg / Atovaquone 250mg tablets 24 tablet'),
(54, 'Potassium hydroxide 5% solution 3 ml'),
(55, 'Glecaprevir 100mg / Pibrentasvir 40mg tablets 84 tablet'),
(56, 'Histamine phosphate 250micrograms/ml nebuliser liquid 10ml bottles 1 bottle'),
(57, 'Normal immunoglobulin human 8g/40ml solution for infusion vials 1 vial'),
(58, 'Dimethyl fumarate 30mg gastro-resistant tablets 42 tablet'),
(59, 'Proguanil 100mg / Atovaquone 250mg tablets 36 tablet'),
(60, 'Dimethyl fumarate 120mg gastro-resistant tablets 90 tablet'),
(61, 'Fluorescein 441.5mg/5ml solution for injection ampoules 10 ampoule'),
(62, 'Generic Trimbow 87micrograms/dose / 5micrograms/dose / 9micrograms/dose inhaler 120 dose'),
(63, 'Dimethyl fumarate 120mg gastro-resistant tablets 180 tablet'),
(64, 'Co-careldopa 10mg/40mg/5ml oral suspension 1 ml'),
(65, 'Generic HyFiber liquid 30ml sachets gluten free 100 sachet'),
(66, 'Prilocaine 66mg/2.2ml / Felypressin 0.066units/2.2ml solution for injection self aspirating cartridges 50 cartridge'),
(67, 'Betamethasone dipropionate 0.05% ointment 25% in White soft paraffin 1 gram'),
(68, 'Pregabalin 300mg/5ml oral suspension 1 ml'),
(69, 'Salicylic acid 4% ointment 1 gram'),
(70, 'Clopidogrel 7mg/ml oral suspension 1 ml'),
(71, 'Atorvastatin 80mg/5ml oral suspension 1 ml'),
(72, 'Ranitidine 1mg/5ml oral solution 1 ml'),
(73, 'Hydroxychloroquine 400mg/5ml oral suspension 1 ml'),
(74, 'Omeprazole 5mg/5ml oral solution 1 ml'),
(75, 'Clonidine 62.5micrograms/5ml oral suspension 1 ml'),
(76, 'Omeprazole 3.5mg/5ml oral suspension 1 ml'),
(77, 'Sertraline 5mg/5ml oral suspension 1 ml'),
(78, 'Generic Purepotions Hair & Scalp natural conditioner 200 ml'),
(79, 'Generic Purepotions Hair & Scalp natural shampoo 200 ml'),
(80, 'Ticagrelor 90mg orodispersible tablets sugar free 56 tablet'),
(81, 'Thiopental 500mg powder for solution for injection vials 10 vial'),
(82, 'Generic Udderly Smooth moisturising cream 114 gram'),
(83, 'Generic Udderly Smooth Extra Care cream with 10% urea 118 ml'),
(84, 'Generic Udderly Smooth moisturising cream 340 gram'),
(85, 'Hydrocolloid dressing semi-permeable sterile without adhesive border 17cm x 17cm sacral 5 dressing'),
(86, 'Hydrocolloid dressing semi-permeable sterile without adhesive border 17cm x 17cm sacral 1 dressing'),
(87, 'Generic Resource ThickenUp Clear powder 127 gram'),
(88, 'Generic Mextra Superabsorbent dressing 22.5cm x 42.5cm rectangular 10 dressing'),
(89, 'Eliglustat 84mg capsules 56 capsule'),
(90, 'Generic Mextra Superabsorbent dressing 22.5cm x 42.5cm rectangular 1 dressing'),
(91, 'Generic Mextra Superabsorbent dressing 22.5cm x 32.5cm rectangular 1 dressing'),
(92, 'Generic Mextra Superabsorbent dressing 22.5cm x 32.5cm rectangular 10 dressing'),
(93, 'Generic Mextra Superabsorbent dressing 22.5cm x 27.5cm rectangular 10 dressing'),
(94, 'Generic Mextra Superabsorbent dressing 22.5cm x 27.5cm rectangular 1 dressing'),
(95, 'Generic Mextra Superabsorbent dressing 17.5cm x 22.5cm rectangular 1 dressing'),
(96, 'Generic Mextra Superabsorbent dressing 12.5cm x 22.5cm rectangular 10 dressing'),
(97, 'Generic Mextra Superabsorbent dressing 12.5cm x 22.5cm rectangular 1 dressing'),
(98, 'Generic Mextra Superabsorbent dressing 12.5cm x 17.5cm rectangular 10 dressing'),
(99, 'Generic Mextra Superabsorbent dressing 12.5cm x 17.5cm rectangular 1 dressing'),
(100, 'Generic Mextra Superabsorbent dressing 12.5cm x 12.5cm square 10 dressing'),
(101, 'Generic Mextra Superabsorbent dressing 12.5cm x 12.5cm square 1 dressing'),
(102, 'Magnesium oxide 375mg capsules 1 capsule'),
(103, 'Atomoxetine 30mg/5ml oral suspension 1 ml'),
(104, 'Lansoprazole 15mg oral powder sachets 1 sachet'),
(105, 'Liothyronine 10microgram tablets 1 tablet'),
(106, 'Pizotifen 1mg/5ml oral suspension 1 ml'),
(107, 'Histamine phosphate 32mg/ml nebuliser liquid 5ml ampoules 10 ampoule'),
(108, 'Histamine phosphate 32mg/ml nebuliser liquid 5ml ampoules 1 ampoule'),
(109, 'Ketoprofen 100mg suppositories 1 suppository'),
(110, 'Ergocalciferol 250microgram capsules 1 capsule'),
(111, 'Histamine phosphate 16mg/ml nebuliser liquid 10ml ampoules 1 ampoule'),
(112, 'Histamine phosphate 500micrograms/ml nebuliser liquid 6ml ampoules 5 ampoule'),
(113, 'Histamine phosphate 16mg/ml nebuliser liquid 10ml ampoules 5 ampoule'),
(114, 'Liothyronine 20micrograms/5ml oral suspension 1 ml'),
(115, 'Histamine phosphate 500micrograms/ml nebuliser liquid 6ml ampoules 1 ampoule'),
(116, 'Inotuzumab ozogamicin 1mg powder for solution for infusion vials 1 vial'),
(117, 'IgM-enriched immunoglobulin human 5g/100ml solution for infusion vials 1 vial'),
(118, 'Oral film forming agents 30 tablet'),
(119, 'IgM-enriched immunoglobulin human 2.5g/50ml solution for infusion vials 1 vial'),
(120, 'Limb protectors mid-arm cover large 1 device'),
(121, 'Limb protectors mid-arm cover small 1 device'),
(122, 'Limb protectors mid-arm cover medium 1 device'),
(123, 'Generic ActivHeal Aquafiber Ag dressing 2.7cm x 32cm rope 5 dressing'),
(124, 'Generic ActivHeal Aquafiber Ag dressing 2.7cm x 32cm rope 1 dressing'),
(125, 'Generic ActivHeal Aquafiber Ag dressing 15cm x 15cm square 5 dressing'),
(126, 'Generic ActivHeal Aquafiber Ag dressing 15cm x 15cm square 1 dressing'),
(127, 'Generic ActivHeal Aquafiber Ag dressing 5cm x 5cm square 10 dressing'),
(128, 'Generic ActivHeal Aquafiber Ag dressing 10cm x 10cm square 1 dressing'),
(129, 'Generic ActivHeal Aquafiber Ag dressing 10cm x 10cm square 10 dressing'),
(130, 'Rituximab 500mg/50ml solution for infusion vials 2 vial'),
(131, 'Generic ActivHeal Aquafiber Ag dressing 5cm x 5cm square 1 dressing'),
(132, 'Mitomycin 40mg powder and solvent for intravesical solution vials 1 vial'),
(133, 'Mitomycin 20mg powder and solvent for intravesical solution vials 1 vial'),
(134, 'Gluten free bread 172 gram'),
(135, 'Glutamine 500mg capsules 120 capsule'),
(136, 'L-Phenylalanine 500mg capsules 120 capsule'),
(137, 'Pirfenidone 267mg tablets 63 tablet'),
(138, 'Arginine 500mg capsules 120 capsule'),
(139, 'Pirfenidone 801mg tablets 84 tablet'),
(140, 'Brodalumab 210mg/1.5ml solution for injection pre-filled syringes 2 pre-filled disposable injection'),
(141, 'Generic Zetuvit Plus dressing 20cm x 40cm 10 dressing'),
(142, 'Rolapitant 90mg tablets 2 tablet'),
(143, 'Pirfenidone 267mg tablets 252 tablet'),
(144, 'Diclofenac 50mg/5ml oral suspension 150 ml'),
(145, 'Ciclosporin 0.06% eye drops 0.4ml unit dose preservative free 1 unit dose'),
(146, 'Olaratumab 190mg/19ml solution for infusion vials 1 vial'),
(147, 'Baricitinib 2mg tablets 28 tablet'),
(148, 'Generic PaediaSure Compact liquid 500 ml'),
(149, 'Histamine phosphate 125micrograms/ml nebuliser liquid 6ml ampoules 5 ampoule'),
(150, 'Histamine phosphate 125micrograms/ml nebuliser liquid 6ml ampoules 1 ampoule'),
(151, 'Co-codamol 60mg/1000mg tablets 100 tablet'),
(152, 'Migalastat 123mg capsules 14 capsule'),
(153, 'Lorazepam 1mg/ml oral solution 150 ml'),
(154, 'Metronidazole 500mg/100ml solution for infusion bottles 1 bottle'),
(155, 'Levofloxacin 500mg/100ml solution for infusion bottles 1 bottle'),
(156, 'Ciprofloxacin 400mg/200ml solution for infusion bottles 1 bottle'),
(157, 'Generic Trumenba vaccine suspension for injection 0.5ml pre-filled syringes 1 pre-filled disposable injection'),
(158, 'Adenosine 30mg/10ml solution for infusion vials 5 vial'),
(159, 'Glycerol phenylbutyrate 1.1g/ml oral liquid 25 ml'),
(160, 'Rotavirus vaccine live oral suspension 1.5ml tube 1 tube'),
(161, 'Naproxen 500mg suppositories 1 suppository'),
(162, 'Tasonermin 1mg powder for solution for infusion vials 4 vial'),
(163, 'Carbamazepine 50mg/5ml oral solution 1 ml'),
(164, 'Metronidazole 200mg suppositories 1 suppository'),
(165, 'Propylthiouracil 100mg suppositories 1 suppository'),
(166, 'Generic Fresubin 2kcal Mini drink 500 ml'),
(167, 'Colecalciferol 400units/ml oral drops sugar free 50 ml'),
(168, 'Generic Fresubin 2kcal Fibre Mini drink 500 ml'),
(169, 'Rifaximin 100mg/5ml oral suspension 1 ml'),
(170, 'Paraffin gauze dressing BP sterile normal loading 175-220g per square metre 10cm x 7m 1 dressing'),
(171, 'Atezolizumab 1.2g/20ml solution for infusion vials 1 vial'),
(172, 'Generic Healon5 2.3% ophthalmic viscosurgical device 0.6ml pre-filled syringes 1 device'),
(173, 'Generic Healon GV 1.4% ophthalmic viscosurgical device 0.55ml pre-filled syringes 1 device'),
(174, 'Generic Healon GV 1.4% ophthalmic viscosurgical device 0.85ml pre-filled syringes 1 device'),
(175, 'Mercaptamine 3.8mg/ml eye drops 5 ml'),
(176, 'Cyproterone 50mg tablets 160 tablet'),
(177, 'Generic KetoClassic 3:1 Savoury meal 110 gram'),
(178, 'Eslicarbazepine 200mg tablets 60 tablet'),
(179, 'Eslicarbazepine 200mg tablets 20 tablet'),
(180, 'Colecalciferol 400unit chewable tablets 500 tablet'),
(181, 'Colecalciferol 400unit chewable tablets 100 tablet'),
(182, 'Colecalciferol 2,000unit chewable tablets 60 tablet'),
(183, 'Nepafenac 3mg/ml eye drops 3 ml'),
(184, 'Benzocaine 17.9% oromucosal gel 30 ml'),
(185, 'Sunscreen lotion 250 ml'),
(186, 'Generic Ultrasun Sports spray SPF 50 150 ml'),
(187, 'Sunscreen lotion 400 ml'),
(188, 'Generic Ultrasun Sports spray SPF 30 150 ml'),
(189, 'Generic Ultrasun Sports gel SPF 30 400 ml'),
(190, 'Generic Ultrasun Sports gel SPF 30 200 ml'),
(191, 'Generic Dermatonics Dry Skin Balm 500 ml'),
(192, 'Generic Dermatonics Dry Skin Balm 200 ml'),
(193, 'Generic Ultrasun Sports gel SPF 20 400 ml'),
(194, 'Memantine 10mg soluble tablets sugar free 7 tablet'),
(195, 'Memantine 20mg soluble tablets sugar free 7 tablet'),
(196, 'Naltrexone 8mg / Bupropion 90mg modified-release tablets 112 tablet'),
(197, 'Macrogol compound oral powder sachets NPF sugar free 4 sachet'),
(198, 'Generic Alzhok soluble tablets treatment initiation pack sugar free 28 tablet'),
(199, 'Follitropin delta 12micrograms/0.36ml solution for injection cartridges 1 cartridge'),
(200, 'Follitropin delta 36micrograms/1.08ml solution for injection cartridges 1 cartridge'),
(201, 'Follitropin delta 72micrograms/2.16ml solution for injection cartridges 1 cartridge'),
(202, 'Generic Prismocitrate 18/0 solution for haemofiltration 5litre bags 1 bag'),
(203, 'Propofol 200mg/20ml emulsion for injection vials 5 vial'),
(204, 'Eluxadoline 100mg tablets 56 tablet'),
(205, 'Natamycin 5% eye drops 15 ml'),
(206, 'Generic PrismOcal B22 solution for haemofiltration 5litre bags 1 bag'),
(207, 'Generic Fresubin Powder Extra starter pack oral powder sachets 8 sachet'),
(208, 'Eluxadoline 75mg tablets 56 tablet'),
(209, 'Generic Fresubin Powder Extra oral powder 62g sachets 2 sachet'),
(210, 'Generic Fresubin Energy liquid starter pack 1200 ml'),
(211, 'Generic Fresubin Jucy drink starter pack 1200 ml'),
(212, 'Generic Fresubin Jucy drink 400 ml'),
(213, 'Generic Fresubin 2kcal drink starter pack 1200 ml'),
(214, 'Ascorbic acid 500mg chewable tablets 180 tablet'),
(215, 'Bezlotoxumab 1g/40ml solution for infusion vials 1 vial'),
(216, 'Generic NeilMed Sinus Rinse sachets 120 sachet'),
(217, 'Generic NeilMed Sinus Rinse starter kit 1 kit'),
(218, 'Alfentanil 25mg/50ml solution for injection vials 1 vial'),
(219, 'Memantine 15mg soluble tablets sugar free 7 tablet'),
(220, 'Memantine 5mg soluble tablets sugar free 7 tablet'),
(221, 'Prussian blue insoluble 500mg capsules 36 capsule'),
(222, 'Memantine 20mg soluble tablets sugar free 28 tablet'),
(223, 'Memantine 10mg soluble tablets sugar free 28 tablet'),
(224, 'Carfilzomib 10mg powder for solution for infusion vials 1 vial'),
(225, 'Generic NeilMed Sinus Rinse kit 1 kit'),
(226, 'Generic Fresubin YoDrink 200 ml'),
(227, 'Carfilzomib 30mg powder for solution for infusion vials 1 vial'),
(228, 'Acetylcysteine 600mg effervescent tablets sugar free 30 tablet'),
(229, 'Adenosine 6mg/2ml solution for injection vials 5 vial'),
(230, 'Generic Hydrozid spray 250 ml'),
(231, 'Generic Z-Hyalin Plus 1.5% ophthalmic viscosurgical device 1 device'),
(232, 'Racemic camphor 0.5% / Chloroxylenol 0.25% cream 150 ml'),
(233, 'Generic Z-Hyalin 1% ophthalmic viscosurgical device 1 device'),
(234, 'Alteplase 2mg powder for solution for injection vials 5 vial'),
(235, 'Acetylcysteine 600mg effervescent tablets sugar free 20 tablet'),
(236, 'Vincristine 2mg/50ml infusion bags 1 bag'),
(237, 'Etelcalcetide 10mg/2ml solution for injection vials 6 vial'),
(238, 'Etelcalcetide 5mg/1ml solution for injection vials 6 vial'),
(239, 'Generic Gaviscon Double Action chewable tablets sugar free 24 tablet'),
(240, 'Generic Gaviscon Double Action chewable tablets sugar free 48 tablet'),
(241, 'Generic Gaviscon Cool 250mg chewable tablets sugar free 48 tablet'),
(242, 'Generic Altrashot Starter Pack liquid 2 bottle'),
(243, 'Generic Gaviscon Cool 250mg chewable tablets sugar free 24 tablet'),
(244, 'Generic Altrashot 120ml bottles 1 bottle'),
(245, 'Generic Gaviscon Double Action chewable tablets sugar free 12 tablet'),
(246, 'Colecalciferol 10,000units/5ml oral solution sugar free 50 ml'),
(247, 'Colecalciferol 15,000units/5ml oral solution sugar free 50 ml'),
(248, 'Midazolam 10mg/1ml oromucosal solution pre-filled oral syringes sugar free 1 unit dose'),
(249, 'Generic Elave shower gel 250 ml'),
(250, 'Generic Elave conditioner 250 ml'),
(251, 'Generic Elave hand wash 500 ml'),
(252, 'Generic Elave body wash 1000 ml'),
(253, 'Generic Elave facial cleanser 250 ml'),
(254, 'Vaginal moisturisers 100 ml'),
(255, 'Generic Zeroveen cream 500 gram'),
(256, 'Generic Zeroveen cream 100 gram'),
(257, 'Generic Lube in a Tube lubricating jelly 82 gram'),
(258, 'Hydrogel sheet with adhesive border 7.5cm x 7.5cm square 10 dressing'),
(259, 'Hydrogel sheet with adhesive border 7.5cm x 7.5cm square 1 dressing'),
(260, 'Hydrogel sheet with adhesive border 4.5cm x 4.5cm square 10 dressing'),
(261, 'Hydrogel sheet with adhesive border 4.5cm x 4.5cm square 1 dressing'),
(262, 'Silicone topical gel 10 gram'),
(263, 'Absorbent perforated dressing with adhesive border 10cm x 25cm 15 dressing'),
(264, 'Absorbent perforated dressing with adhesive border 10cm x 10cm 15 dressing'),
(265, 'Absorbent perforated dressing with adhesive border 10cm x 20cm 15 dressing'),
(266, 'Absorbent perforated dressing with adhesive border 6.5cm x 8cm 15 dressing'),
(267, 'Absorbent perforated dressing with adhesive border 10cm x 15cm 15 dressing'),
(268, 'Colecalciferol 14,400units/ml oral drops sugar free 12.5 ml'),
(269, 'Absorbent perforated dressing with adhesive border 6.5cm x 8cm 1 dressing'),
(270, 'Potassium citrate 1080mg modified-release tablets 100 tablet'),
(271, 'Generic Califig Syrup of Figs oral solution sugar free 100 ml'),
(272, 'Absorbent perforated dressing with adhesive border 5cm x 7cm 15 dressing'),
(273, 'Generic Swalloweze Clear Instant Food & Fluid Thickener powder sugar free 165 gram'),
(274, 'Racemic camphor 0.5% / Chloroxylenol 0.25% cream 150 gram'),
(275, 'Low protein bread 300 gram'),
(276, 'Absorbent perforated dressing with adhesive border 10cm x 35cm 15 dressing'),
(277, 'Generic Adept Adhesion Reduction irrigation solution 1.5litre bags 5 bag'),
(278, 'Belladonna medicated plaster 28cm x 17.5cm 1 plaster'),
(279, 'Menthol 17.5% / Peppermint oil 0.2% liquid 7.5 ml'),
(280, 'Generic Adept Adhesion Reduction irrigation solution 1.5litre bags 1 bag'),
(281, 'Fluocinonide 0.05% ointment 25% in White soft paraffin 1 gram'),
(282, 'Salicylic acid 2% in Yellow soft paraffin 1 gram'),
(283, 'Hydroxyzine 15mg/5ml oral suspension 1 ml'),
(284, 'Diltiazem 4% ointment 1 gram'),
(285, 'Belladonna medicated plaster 9.5cm x 12.5cm 2 plaster'),
(286, 'Liothyronine 25microgram tablets 1 tablet'),
(287, 'Generic Fortisip Compact Protein Starter Pack liquid 750 ml'),
(288, 'Felodipine 2.5mg/5ml oral suspension 1 ml'),
(289, 'Diltiazem 1% cream 1 gram'),
(290, 'Coal tar solution 10% / Salicylic acid 10% in Generic Unguentum M cream 1 gram'),
(291, 'Ketoprofen 10% gel 1 gram'),
(292, 'Melatonin 4mg tablets 1 tablet'),
(293, 'Medicinal leeches 1 leech'),
(294, 'Etelcalcetide 2.5mg/0.5ml solution for injection vials 6 vial'),
(295, 'Blood glucose and ketone testing strips 50 strip'),
(296, 'Dalbavancin 500mg powder for solution for infusion vials 1 vial'),
(297, 'Generic Biosorb Gelling Fibre dressing 2cm x 45cm ribbon 1 dressing'),
(298, 'Generic Biosorb Gelling Fibre dressing 15cm x 15cm square 1 dressing'),
(299, 'Generic Biosorb Gelling Fibre dressing 10cm x 10cm square 1 dressing'),
(300, 'Generic Biosorb Gelling Fibre dressing 5cm x 5cm square 1 dressing'),
(301, 'Soft silicone wound contact dressing sterile 17cm x 25cm 5 dressing'),
(302, 'Clindamycin 150mg/5ml oral suspension 1 ml'),
(303, 'Soft silicone wound contact dressing sterile 17cm x 25cm 1 dressing'),
(304, 'Pentoxifylline 100mg/5ml oral suspension 1 ml'),
(305, 'Tranexamic acid 150mg/5ml oral solution 1 ml'),
(306, 'Melatonin 10mg tablets 1 tablet'),
(307, 'Soft silicone wound contact dressing with polyurethane foam film backing sterile and silicone adhesive border 18cm x 18cm heel 5 dressing'),
(308, 'Soft silicone wound contact dressing with polyurethane foam film backing sterile and silicone adhesive border 18cm x 18cm heel 1 dressing'),
(309, 'Perampanel 4mg/5ml oral suspension 1 ml'),
(310, 'Soft silicone wound contact dressing with polyurethane foam film backing sterile and silicone adhesive border 25cm x 25cm sacral 5 dressing'),
(311, 'Soft silicone wound contact dressing with polyurethane foam film backing sterile and silicone adhesive border 15cm x 19cm sacral 5 dressing'),
(312, 'Soft silicone wound contact dressing with polyurethane foam film backing sterile and silicone adhesive border 15cm x 19cm sacral 1 dressing'),
(313, 'Soft silicone wound contact dressing with polyurethane foam film backing sterile and silicone adhesive border 25cm x 25cm sacral 1 dressing'),
(314, 'Riboflavin 100mg tablets 1 tablet'),
(315, 'Soft silicone wound contact dressing with polyurethane foam film backing sterile and silicone adhesive border 14cm x 19.5cm multishape 1 dressing'),
(316, 'Soft silicone wound contact dressing with polyurethane foam film backing sterile and silicone adhesive border 14cm x 19.5cm multishape 5 dressing'),
(317, 'Mercaptamine 0.55% eye drops preservative free 10 ml'),
(318, 'Pembrolizumab 100mg/4ml solution for infusion vials 1 vial'),
(319, 'Nortriptyline 10mg/5ml oral suspension 100 ml'),
(320, 'Metronidazole 10% ointment 1 gram'),
(321, 'Melatonin 7mg capsules 1 capsule'),
(322, 'Dextromethorphan 30mg/5ml oral solution 1 ml'),
(323, 'Progesterone 100mg/1ml solution for injection ampoules 1 ampoule'),
(324, 'Glycopyrronium bromide 3% in Cetomacrogol cream (Formula A) 1 gram'),
(325, 'Theophylline 75mg/5ml oral suspension 1 ml'),
(326, 'Baricitinib 4mg tablets 28 tablet'),
(327, 'Sodium bicarbonate 50mg/5ml oral solution 1 ml'),
(328, 'Hydroxyzine 10mg/5ml oral solution 1 ml'),
(329, 'Pizotifen 750micrograms/5ml oral suspension 1 ml'),
(330, 'Edrophonium chloride 150mg/15ml solution for injection vials 1 vial'),
(331, 'Propofol 500mg/50ml emulsion for infusion vials 10 vial'),
(332, 'Paracetamol 1g/100ml solution for infusion bottles 10 bottle'),
(333, 'Timolol 2.5mg/ml eye drops preservative free 5 ml'),
(334, 'Cyproterone 50mg tablets 60 tablet'),
(335, 'Antithrombin III 1,000unit powder and solvent for solution for infusion vials 1 vial'),
(336, 'Timolol 5mg/ml eye drops preservative free 5 ml'),
(337, 'Antithrombin III 500unit powder and solvent for solution for infusion vials 1 vial'),
(338, 'Dorzolamide 20mg/ml / Timolol 5mg/ml eye drops preservative free 5 ml'),
(339, 'Colecalciferol 2,500unit capsules 60 capsule'),
(340, 'Dorzolamide 20mg/ml eye drops preservative free 5 ml'),
(341, 'Esmolol 2.5g powder for solution for infusion vials 1 vial'),
(342, 'Generic HealthAid Osteoflex Plus modified-release tablets 30 tablet'),
(343, 'Generic Cutan Hand Sanitiser foam 47 ml'),
(344, 'Generic HealthAid Osteoflex & Omega 3 tablets and capsules 1 pack'),
(345, 'Generic HealthAid Osteoflex Fizzy effervescent tablets sugar free 20 tablet'),
(346, 'Tofacitinib 5mg tablets 56 tablet'),
(347, 'Perflutren-containing microspheres of heat treated human albumin 570micrograms/3ml dispersion for injection vials 5 vial'),
(348, 'Histamine phosphate 4mg/ml nebuliser liquid 10ml ampoules 5 ampoule'),
(349, 'Low protein mix 248 gram'),
(350, 'Alverine 60mg / Simeticone 300mg capsules 90 capsule'),
(351, 'Colecalciferol 400unit capsules 28 capsule'),
(352, 'Haloperidol 200micrograms/ml oral solution sugar free 200 ml'),
(353, 'Disodium edetate 3.72% solution for injection 2ml ampoules 1 ampoule'),
(354, 'Macrogol 3350 oral powder 8.5g sachets sugar free 28 sachet'),
(355, 'Disodium edetate 3.72% solution for injection 2ml ampoules 10 ampoule'),
(356, 'Magnesium glycerophosphate (magnesium 97.2mg (4mmol)) capsules 50 capsule'),
(357, 'Magnesium glycerophosphate (magnesium 48.6mg (2mmol)) capsules 50 capsule'),
(358, 'Colecalciferol 25,000unit capsules 3 capsule'),
(359, 'Colecalciferol 50,000unit capsules 3 capsule'),
(360, 'Colecalciferol 5,600unit capsules 4 capsule'),
(361, 'Carmoisine 1% cutaneous solution 10 ml'),
(362, 'Carmoisine 1% cutaneous solution 1 ml'),
(363, 'Capsaicin 0.03% nebuliser liquid 5ml bottles 1 bottle'),
(364, 'Tioguanine 50mg/5ml oral suspension 1 ml'),
(365, 'Phytomenadione 10mg capsules 1 capsule'),
(366, 'Cefuroxime 50mg powder for solution for injection vials 1 vial'),
(367, 'Aminophylline 500mg/500ml solution for infusion bottles 1 bottle'),
(368, 'Pyridoxine 50mg/2ml solution for injection vials 5 vial'),
(369, 'Amoxicillin 500mg/50ml infusion bags 1 bag'),
(370, 'Histamine phosphate 40mg/ml nebuliser liquid 5ml ampoules 5 ampoule'),
(371, 'Histamine phosphate 40mg/ml nebuliser liquid 5ml ampoules 1 ampoule'),
(372, 'Histamine phosphate 32mg/ml nebuliser liquid 10ml ampoules 5 ampoule'),
(373, 'Histamine phosphate 32mg/ml nebuliser liquid 10ml ampoules 1 ampoule'),
(374, 'Histamine phosphate 16mg/ml nebuliser liquid 10ml bottles 1 bottle'),
(375, 'Histamine phosphate 4mg/ml nebuliser liquid 10ml ampoules 1 ampoule'),
(376, 'Histamine phosphate 2mg/ml nebuliser liquid 6ml ampoules 5 ampoule'),
(377, 'Histamine phosphate 2mg/ml nebuliser liquid 6ml ampoules 1 ampoule'),
(378, 'Histamine phosphate 1mg/ml nebuliser liquid 6ml ampoules 5 ampoule'),
(379, 'Colecalciferol 200unit / Calcium phosphate 250mg chewable tablets 30 tablet'),
(380, 'Histamine phosphate 1mg/ml nebuliser liquid 6ml ampoules 1 ampoule'),
(381, 'Histamine phosphate 250micrograms/ml nebuliser liquid 6ml ampoules 1 ampoule'),
(382, 'Histamine phosphate 500micrograms/ml nebuliser liquid 10ml bottles 1 bottle'),
(383, 'Generic Urostemol femina capsules 60 capsule'),
(384, 'Generic Urostemol femina capsules 120 capsule'),
(385, 'Histamine phosphate 250micrograms/ml nebuliser liquid 6ml ampoules 5 ampoule'),
(386, 'Histamine phosphate 125micrograms/ml nebuliser liquid 10ml bottles 1 bottle'),
(387, 'Generic Urostemol Men capsules 120 capsule'),
(388, 'Generic Urostemol Men capsules 60 capsule'),
(389, 'Sterile subcutaneous drug delivery device 110cm tubing 6mm needle 27gauge 1 device'),
(390, 'Histamine phosphate 60micrograms/ml nebuliser liquid 10ml bottles 1 bottle'),
(391, 'Histamine phosphate 30micrograms/ml nebuliser liquid 10ml bottles 1 bottle'),
(392, 'Low protein gluten free burger mix 248 gram'),
(393, 'Generic Urostemol Prosta capsules 80 capsule'),
(394, 'Generic Urostemol Prosta capsules 40 capsule'),
(395, 'Generic SMA PRO High Energy liquid 200 ml'),
(396, 'Generic Urostemol capsules 100 capsule'),
(397, 'Generic Urostemol capsules 50 capsule'),
(398, 'Propofol 500mg/50ml emulsion for infusion ampoules 10 ampoule'),
(399, 'Permeable non-woven synthetic adhesive tape BP 1988 7.5cm 5 m'),
(400, 'Tracheostomy dressing sterile 6cm x 7cm 10 dressing'),
(401, 'Ostomy skin protectives 45 device'),
(402, 'Tracheostomy dressing sterile 6cm x 7cm 1 dressing'),
(403, 'Mitomycin 0.04% eye drops 10 ml'),
(404, 'Mitomycin 0.04% eye drops 1 ml'),
(405, 'Mitomycin 0.02% eye drops 1 ml'),
(406, 'Alectinib 150mg capsules 224 capsule'),
(407, 'Mitomycin 0.02% eye drops 10 ml'),
(408, 'Glucarpidase 1,000unit powder for solution for injection vials 1 vial'),
(409, 'Cyanocobalamin 100microgram tablets 100 tablet'),
(410, 'Rabies vaccine powder and solvent for solution for injection 1ml pre-filled syringes 1 pre-filled disposable injection'),
(411, 'Generic G & G MSM 500mg capsules 100 capsule'),
(412, 'Generic Neocate Junior powder 400 gram'),
(413, 'Generic G & G MSM 500mg & Vitamin C 100mg capsules 120 capsule'),
(414, 'Cytarabine 5g/50ml solution for infusion vials 1 vial'),
(415, 'Chlorhexidine gluconate 0.5% / Isopropyl alcohol 70% solution 500 ml'),
(416, 'Cytarabine 4g/40ml solution for injection vials 1 vial'),
(417, 'Amobarbital sodium 500mg powder for solution for injection vials 1 vial'),
(418, 'Generic Health Plus Omega Flaxseed Oil 1000mg capsules 90 capsule'),
(419, 'Potassium phosphate 17.42% (potassium 2mmol/ml) oral solution 10 ml'),
(420, 'Generic Health Plus Omega Flaxseed Oil 450mg capsules 90 capsule'),
(421, 'Generic Health Plus Omega Complex capsules 240 capsule'),
(422, 'Generic Health Plus Omega Complex capsules 30 capsule'),
(423, 'Eicosapentaenoic acid 460mg / Docosahexaenoic acid 380mg capsules 90 capsule'),
(424, 'Riboflavin 50mg capsules 120 capsule'),
(425, 'Ostomy skin protectives 250 ml'),
(426, 'Pyridoxine 100mg capsules 120 capsule'),
(427, 'Magnesium hydroxide 8% oral suspension 200 ml'),
(428, 'Magnesium hydroxide 8% oral suspension 500 ml'),
(429, 'Magnesium hydroxide 7.45-8.35% oral suspension BP 500 ml'),
(430, 'Magnesium hydroxide 7.45-8.35% oral suspension BP 200 ml'),
(431, 'Ceftazidime 2g / Avibactam 500mg powder for solution for infusion vials 10 vial'),
(432, 'Generic G & G Glucosamine with Chondroitin & Vitamin C capsules 120 capsule'),
(433, 'Dolutegravir 25mg tablets 30 tablet'),
(434, 'Dolutegravir 10mg tablets 30 tablet'),
(435, 'Colecalciferol 10,000unit capsules 28 capsule'),
(436, 'Lavender oil 80mg capsules 14 capsule'),
(437, 'Colecalciferol 3,200unit capsules 28 capsule'),
(438, 'Colecalciferol 2,200unit capsules 28 capsule'),
(439, 'Generic PharmaClinix Acnex Clear cream 50 ml'),
(440, 'Valerian root extract 500mg tablets 21 tablet'),
(441, 'Everolimus 2mg dispersible tablets sugar free 30 tablet'),
(442, 'Everolimus 3mg dispersible tablets sugar free 30 tablet'),
(443, 'Everolimus 5mg dispersible tablets sugar free 30 tablet'),
(444, 'Methotrexate 25mg/1ml solution for injection pre-filled disposable devices 1 pre-filled disposable injection'),
(445, 'Methotrexate 22.5mg/0.9ml solution for injection pre-filled disposable devices 1 pre-filled disposable injection'),
(446, 'Generic Health Plus Omega Complex capsules 90 capsule'),
(447, 'Methotrexate 17.5mg/0.7ml solution for injection pre-filled disposable devices 1 pre-filled disposable injection'),
(448, 'Fibrinogen 1.5g powder and solvent for solution for infusion vials 1 vial'),
(449, 'Methotrexate 12.5mg/0.5ml solution for injection pre-filled disposable devices 1 pre-filled disposable injection'),
(450, 'Methotrexate 20mg/0.8ml solution for injection pre-filled disposable devices 1 pre-filled disposable injection'),
(451, 'Methotrexate 7.5mg/0.3ml solution for injection pre-filled disposable devices 1 pre-filled disposable injection'),
(452, 'Methotrexate 10mg/0.4ml solution for injection pre-filled disposable devices 1 pre-filled disposable injection'),
(453, 'Methotrexate 15mg/0.6ml solution for injection pre-filled disposable devices 1 pre-filled disposable injection'),
(454, 'Cyanocobalamin 10microgram tablets 100 tablet'),
(455, 'Generic Maalox Plus oral suspension sugar free 180 ml'),
(456, 'Generic Maalox Plus chewable tablets 30 tablet'),
(457, 'Generic Aveeno Bath & Shower oil 300 ml'),
(458, 'Methylcellulose 5mg/ml enema 1 ml'),
(459, 'Levobupivacaine hydrochloride 625mg/500ml / Fentanyl 1mg/500ml infusion bags 1 bag'),
(460, 'Generic LaBiNIC oral drops sugar free 5 ml'),
(461, 'Generic Skin Salvation ointment 150 ml'),
(462, 'Irinotecan 50mg/10ml solution for infusion vials 1 vial'),
(463, 'Levobupivacaine hydrochloride 625mg/500ml / Fentanyl 2mg/500ml infusion bags 1 bag'),
(464, 'Generic Bach Rescue Remedy oral drops sugar free 10 ml'),
(465, 'Methylcellulose 5mg/ml enema 1000 ml'),
(466, 'Generic Bach Rescue Remedy spray sugar free 20 ml'),
(467, 'Generic K-Y Jelly non-sterile 75 gram'),
(468, 'Generic TauroLock-U25.000 powder for solution vials 5 vial'),
(469, 'Generic Bach Rescue Remedy oral drops sugar free 20 ml'),
(470, 'Generic K-Y Jelly non-sterile 50 gram'),
(471, 'Generic K-Y Jelly sterile 82 gram'),
(472, 'Generic Cathejell Mono 12.5 gram'),
(473, 'Abiraterone 500mg tablets 56 tablet'),
(474, 'Generic Cathejell Lidocain 12.5 gram'),
(475, 'Generic DEKAs Plus chewable tablets 60 tablet'),
(476, 'Generic Sutherland lubricating jelly 82 gram'),
(477, 'Generic Cathejell Mono 8.5 gram'),
(478, 'Generic Cathejell Lidocain 8.5 gram'),
(479, 'Generic Cathejell Lidocaine C 12.5 gram'),
(480, 'Generic Cathejell Lidocaine C 8.5 gram'),
(481, 'Generic DEKAs Essential capsules 60 capsule'),
(482, 'Generic Sutherland lubricating jelly 5 gram'),
(483, 'Generic Sutherland lubricating jelly 42 gram'),
(484, 'Generic DEKAs Plus liquid sugar free 60 ml'),
(485, 'Generic DEKAs Plus softgels capsules 60 capsule'),
(486, 'Generic OptiLube sterile lubricating jelly 6 ml'),
(487, 'Generic Bach Rescue Remedy spray sugar free 7 ml'),
(488, 'Generic OptiLube sterile lubricating jelly 82 gram'),
(489, 'Generic OptiLube sterile lubricating jelly 42 gram'),
(490, 'Generic OptiLube sterile lubricating jelly 5 gram'),
(491, 'Generic OptiLube Active CHG Free sterile lubricating jelly 6 ml'),
(492, 'Generic Elite lubricating jelly 50 ml'),
(493, 'Generic OptiLube Active sterile lubricating jelly 11 ml'),
(494, 'Generic Aquagel lubricating jelly 82 gram'),
(495, 'Generic OptiLube Active sterile lubricating jelly 6 ml'),
(496, 'Generic Aquagel lubricating jelly 42 gram'),
(497, 'Generic Hydro-Caine Gel 6 ml'),
(498, 'Generic Aquagel lubricating jelly 5 gram'),
(499, 'Generic Hydro-Caine Gel 11 ml'),
(500, 'Generic OptiLube sterile lubricating jelly 11 ml');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `drugorder`
--

CREATE TABLE `drugorder` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `prescription_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `drugorder`
--


-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orderdetail`
--

CREATE TABLE `orderdetail` (
  `id` int(11) NOT NULL,
  `id_order` int(11) NOT NULL,
  `id_drug` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `orderdetail`
--


-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `prescription`
--

CREATE TABLE `prescription` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `prescription`
--


-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `prescriptiondetail`
--

CREATE TABLE `prescriptiondetail` (
  `id` int(11) NOT NULL,
  `id_prescription` int(11) NOT NULL,
  `id_drug` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `prescriptiondetail`
--

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `customers`
--
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
-- Chỉ mục cho bảng `prescription`
--
ALTER TABLE `prescription`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `prescriptiondetail`
--
ALTER TABLE `prescriptiondetail`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;
--
-- AUTO_INCREMENT cho bảng `drug`
--
ALTER TABLE `drug`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;
--
-- AUTO_INCREMENT cho bảng `drugorder`
--
ALTER TABLE `drugorder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;
--
-- AUTO_INCREMENT cho bảng `orderdetail`
--
ALTER TABLE `orderdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;
--
-- AUTO_INCREMENT cho bảng `prescription`
--
ALTER TABLE `prescription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;
--
-- AUTO_INCREMENT cho bảng `prescriptiondetail`
--
ALTER TABLE `prescriptiondetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

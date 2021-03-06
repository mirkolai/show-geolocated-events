SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `geolocated_events`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `events`
--

CREATE TABLE IF NOT EXISTS `events` (
  `lat` double NOT NULL,
  `lon` double NOT NULL,
  `date` datetime NOT NULL,
  `count` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`lat`,`lon`,`date`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella `events`
--

INSERT INTO `events` (`lat`, `lon`, `date`, `count`) VALUES
(45.05, 7.68, '2015-07-30 02:00:00', 30),
(45.06, 7.71, '2015-07-30 10:00:00', 60),
(45.07, 7.69, '2015-07-30 21:00:00', 70),
(45.08, 7.69, '2015-07-30 15:00:00', 20),
(45.06, 7.69, '2015-07-30 11:00:00', 30),
(45.11, 7.7, '2015-07-30 07:00:00', 14),
(45.07, 7.68, '2015-07-30 12:00:00', 40),
(45.07, 7.65, '2015-07-30 04:00:00', 40),
(45.1, 7.7, '2015-07-30 08:00:00', 50),
(45.09, 7.63, '2015-07-30 03:00:00', 30),
(45.11, 7.65, '2015-07-29 15:00:00', 40),
(45.06, 7.7, '2015-07-29 02:00:00', 20),
(45.04, 7.63, '2015-07-29 00:00:00', 10),
(45.07, 7.68, '2015-07-29 09:00:00', 40),
(45.07, 7.67, '2015-07-29 01:00:00', 20),
(45.07, 7.69, '2015-07-29 10:00:00', 50),
(45.06, 7.68, '2015-07-29 07:00:00', 30),
(45.08, 7.68, '2015-07-29 04:00:00', 10),
(45.07, 7.7, '2015-07-29 05:00:00', 20),
(45.07, 7.66, '2015-07-29 11:00:00', 30),
(45.03, 7.61, '2015-07-29 12:00:00', 60),
(45.06, 7.66, '2015-07-29 13:00:00', 16),
(45.1, 7.7, '2015-07-29 12:00:00', 10),
(45.05, 7.68, '2015-07-29 14:00:00', 60),
(45.07, 7.65, '2015-07-29 16:00:00', 30),
(45.05, 7.69, '2015-07-29 08:00:00', 10),
(45.06, 7.65, '2015-07-29 03:00:00', 10),
(45.08, 7.69, '2015-07-29 20:00:00', 10),
(45.09, 7.66, '2015-07-30 17:00:00', 30),
(45.06, 7.68, '2015-07-30 14:00:00', 70),
(45.07, 7.66, '2015-07-30 13:00:00', 30),
(45.06, 7.66, '2015-07-30 20:00:00', 10),
(45.07, 7.7, '2015-07-29 18:00:00', 20),
(45.06, 7.62, '2015-07-29 19:00:00', 20),
(45.06, 7.7, '2015-07-29 23:00:00', 30),
(45.07, 7.67, '2015-07-29 22:00:00', 10),
(45.07, 7.63, '2015-07-29 17:00:00', 40),
(45.06, 7.72, '2015-07-30 16:00:00', 20),
(45.08, 7.68, '2015-07-30 01:00:00', 20),
(45.05, 7.69, '2015-07-30 18:00:00', 10),
(45.07, 7.64, '2015-07-30 22:00:00', 50),
(45.06, 7.65, '2015-07-30 00:00:00', 20);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

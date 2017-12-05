////////////////////////////////////////////////////////////
//////////////////////// Set-up ////////////////////////////
////////////////////////////////////////////////////////////

var screenWidth = $(window).width();

var margin = {left: 50, top: 10, right: 50, bottom: 10},
	width = Math.min(screenWidth, 1000) - margin.left - margin.right,
	height = Math.min(screenWidth, 800) - margin.top - margin.bottom;
			
var svg = d3.select("#chart1").append("svg")
			.attr("width", (width + margin.left + margin.right))
			.attr("height", (height + margin.top + margin.bottom));
			
var wrapper = svg.append("g").attr("class", "chordWrapper")
			.attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");;
			
var outerRadius = Math.min(width, height) / 2  - 100,
	innerRadius = outerRadius * 0.95,
	pullOutSize = 50,
	opacityLow = 0.02,
	opacityDefault = 0.7; //default opacity of chords
	
////////////////////////////////////////////////////////////
////////////////////////// Data ////////////////////////////
////////////////////////////////////////////////////////////

var Names = ['Agric. & Nat. Res. Cons', 'Architecture',
       'Area, Eth. & Multidiscip. Studies', 'Arts: Visual & Performing',
       'Business', 'Commun, Fam., & Personal Svcs', 'Communications',
       'Comp. Sci. & Mathematics', 'Education', 'Eng. Tech. & Drafting',
       'Engineering', 'English & Foreign Lang.',
       'Health Admin. & Assisting', 'Health Sci. & Techno.',
       'Philosophy, Religion, & Theology',
       'Repair, Production, & Construction',
       'Sciences: Biological & Physical', 'Social Sciences & Law', '','Agric. & Nat. Res. Cons', 'Architecture',
       'Area, Eth. & Multidiscip. Studies', 'Arts: Visual & Performing',
       'Business', 'Commun, Fam., & Personal Svcs', 'Communications',
       'Comp. Sci. & Mathematics', 'Education', 'Eng. Tech. & Drafting',
       'Engineering', 'English & Foreign Lang.',
       'Health Admin. & Assisting', 'Health Sci. & Techno.',
       'Philosophy, Religion, & Theology',
       'Repair, Production, & Construction',
       'Sciences: Biological & Physical', 'Social Sciences & Law', ''];

//How many pixels should the slices be pulled from the center

var respondents = 101049, //Total number of respondents (i.e. the number that makes up the group)
	emptyPerc = 0.33, //What % of the circle should become empty in comparison to the visible arcs
	emptyStroke = Math.round(respondents*emptyPerc); //How many "units" would define this empty percentage

var matrix_T1_T2 = [
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1118, 6, 1, 33, 238, 237, 41, 25, 118, 92, 123, 22, 77, 162, 3, 115, 376, 97, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 51, 488, 1, 238, 297, 121, 61, 91, 69, 195, 433, 23, 3, 97, 7, 51, 127, 113, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 15, 7, 16, 14, 5, 6, 6, 0, 4, 16, 1, 4, 0, 3, 10, 52, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 91, 14, 2300, 775, 492, 720, 323, 649, 140, 254, 274, 30, 323, 109, 84, 328, 549, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 262, 26, 14, 334, 3582, 915, 488, 347, 402, 195, 542, 150, 102, 450, 59, 140, 487, 847, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 47, 4, 4, 67, 404, 1117, 87, 47, 274, 46, 54, 44, 55, 294, 21, 42, 139, 504, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 63, 8, 13, 339, 613, 264, 1185, 80, 193, 28, 68, 245, 12, 178, 29, 18, 115, 362, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 6, 2, 237, 477, 128, 109, 1329, 73, 202, 608, 44, 11, 99, 13, 58, 226, 161, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 110, 5, 22, 438, 580, 772, 228, 338, 2217, 54, 161, 430, 63, 553, 66, 47, 363, 753, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 34, 35, 1, 66, 202, 119, 38, 274, 38, 355, 708, 8, 7, 52, 8, 202, 153, 64, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 258, 101, 6, 237, 853, 407, 111, 777, 168, 819, 3426, 77, 39, 375, 27, 416, 962, 393, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33, 4, 35, 157, 181, 97, 257, 46, 181, 9, 41, 652, 11, 93, 21, 7, 102, 301, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 96, 7, 5, 77, 387, 487, 67, 57, 293, 40, 108, 54, 293, 1271, 8, 21, 829, 292, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 658, 25, 22, 448, 1552, 2074, 380, 422, 1294, 224, 1097, 310, 833, 4846, 88, 112, 4165, 1604, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 1, 1, 41, 89, 64, 42, 30, 64, 6, 28, 45, 2, 26, 258, 9, 52, 196, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 3, 0, 9, 96, 74, 9, 28, 16, 139, 86, 5, 4, 24, 7, 305, 25, 27, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 642, 31, 22, 276, 709, 649, 192, 346, 347, 112, 920, 207, 150, 1021, 49, 69, 2975, 777, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 164, 27, 52, 347, 1245, 1837, 454, 252, 517, 84, 357, 381, 75, 709, 132, 67, 841, 3106, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, emptyStroke],
[1118, 51, 3, 63, 262, 47, 63, 21, 110, 34, 258, 33, 96, 658, 9, 56, 642, 164, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[6, 488, 2, 91, 26, 4, 8, 6, 5, 35, 101, 4, 7, 25, 1, 3, 31, 27, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[1, 1, 15, 14, 14, 4, 13, 2, 22, 1, 6, 35, 5, 22, 1, 0, 22, 52, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[33, 238, 7, 2300, 334, 67, 339, 237, 438, 66, 237, 157, 77, 448, 41, 9, 276, 347, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[238, 297, 16, 775, 3582, 404, 613, 477, 580, 202, 853, 181, 387, 1552, 89, 96, 709, 1245, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[237, 121, 14, 492, 915, 1117, 264, 128, 772, 119, 407, 97, 487, 2074, 64, 74, 649, 1837, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[41, 61, 5, 720, 488, 87, 1185, 109, 228, 38, 111, 257, 67, 380, 42, 9, 192, 454, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[25, 91, 6, 323, 347, 47, 80, 1329, 338, 274, 777, 46, 57, 422, 30, 28, 346, 252, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[118, 69, 6, 649, 402, 274, 193, 73, 2217, 38, 168, 181, 293, 1294, 64, 16, 347, 517, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[92, 195, 0, 140, 195, 46, 28, 202, 54, 355, 819, 9, 40, 224, 6, 139, 112, 84, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[123, 433, 4, 254, 542, 54, 68, 608, 161, 708, 3426, 41, 108, 1097, 28, 86, 920, 357, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[22, 23, 16, 274, 150, 44, 245, 44, 430, 8, 77, 652, 54, 310, 45, 5, 207, 381, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[77, 3, 1, 30, 102, 55, 12, 11, 63, 7, 39, 11, 293, 833, 2, 4, 150, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[162, 97, 4, 323, 450, 294, 178, 99, 553, 52, 375, 93, 1271, 4846, 26, 24, 1021, 709, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[3, 7, 0, 109, 59, 21, 29, 13, 66, 8, 27, 21, 8, 88, 258, 7, 49, 132, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[115, 51, 3, 84, 140, 42, 18, 58, 47, 202, 416, 7, 21, 112, 9, 305, 69, 67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[376, 127, 10, 328, 487, 139, 115, 226, 363, 153, 962, 102, 829, 4165, 52, 25, 2975, 841, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[97, 113, 52, 549, 847, 504, 362, 161, 753, 64, 393, 301, 292, 1604, 196, 27, 777, 3106, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, emptyStroke, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var matrix_T2_T3 = [
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2740, 10, 0, 16, 129, 127, 43, 15, 94, 24, 60, 29, 29, 69, 5, 24, 172, 102, 0] ,
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 619, 2, 52, 51, 11, 13, 13, 10, 16, 42, 2, 0, 5, 1, 2, 8, 18, 0] ,
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 146, 5, 15, 5, 5, 0, 4, 0, 2, 14, 0, 1, 1, 0, 3, 27, 0] ,
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21, 43, 8, 3743, 300, 188, 299, 132, 262, 28, 38, 114, 16, 73, 33, 20, 100, 233, 0] ,
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 114, 29, 14, 194, 8296, 664, 617, 297, 325, 104, 159, 157, 72, 224, 34, 83, 238, 675, 0] ,
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 69, 1, 6, 80, 726, 6575, 187, 94, 466, 46, 60, 70, 75, 440, 21, 45, 337, 570, 0] ,
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 1, 9, 197, 315, 170, 3012, 67, 109, 9, 15, 169, 7, 65, 11, 4, 43, 253, 0] ,
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 2, 1, 112, 420, 116, 78, 3195, 112, 80, 207, 61, 9, 46, 10, 34, 162, 149, 0] ,
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 9, 3, 203, 446, 588, 179, 80, 4156, 18, 34, 156, 55, 336, 42, 8, 160, 390, 0] ,
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 6, 0, 33, 142, 49, 20, 96, 20, 1876, 236, 13, 6, 38, 2, 107, 48, 26, 0] ,
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 180, 64, 1, 126, 781, 276, 108, 636, 119, 307, 5283, 66, 12, 137, 12, 97, 554, 259, 0] ,
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 3, 10, 75, 121, 89, 189, 35, 148, 2, 14, 1914, 5, 55, 17, 8, 84, 209, 0] ,
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22, 0, 0, 12, 103, 89, 5, 15, 41, 14, 5, 6, 1110, 244, 0, 11, 62, 29, 0] ,
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 127, 7, 6, 109, 762, 1035, 208, 114, 671, 62, 77, 115, 416, 5382, 32, 39, 835, 580, 0] ,
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 25, 42, 28, 22, 7, 39, 2, 5, 11, 0, 6, 644, 1, 10, 62, 0] ,
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 7, 69, 30, 2, 20, 7, 81, 23, 5, 1, 8, 0, 1476, 9, 14, 0] ,
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 344, 23, 21, 201, 921, 925, 232, 352, 482, 75, 431, 280, 144, 1088, 49, 23, 5481, 1203, 0] ,
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 75, 17, 34, 181, 885, 866, 385, 128, 398, 16, 60, 245, 44, 331, 83, 10, 381, 6059, 0] ,
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, emptyStroke],
[2740, 5, 2, 21, 114, 69, 18, 24, 56, 22, 180, 9, 22, 127, 0, 14, 344, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
[10, 619, 0, 43, 29, 1, 1, 2, 9, 6, 64, 3, 0, 7, 1, 0, 23, 17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
[0, 2, 146, 8, 14, 6, 9, 1, 3, 0, 1, 10, 0, 6, 0, 0, 21, 34, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
[16, 52, 5, 3743, 194, 80, 197, 112, 203, 33, 126, 75, 12, 109, 25, 7, 201, 181, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
[129, 51, 15, 300, 8296, 726, 315, 420, 446, 142, 781, 121, 103, 762, 42, 69, 921, 885, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
[127, 11, 5, 188, 664, 6575, 170, 116, 588, 49, 276, 89, 89, 1035, 28, 30, 925, 866, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
[43, 13, 5, 299, 617, 187, 3012, 78, 179, 20, 108, 189, 5, 208, 22, 2, 232, 385, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
[15, 13, 0, 132, 297, 94, 67, 3195, 80, 96, 636, 35, 15, 114, 7, 20, 352, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
[94, 10, 4, 262, 325, 466, 109, 112, 4156, 20, 119, 148, 41, 671, 39, 7, 482, 398, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
[24, 16, 0, 28, 104, 46, 9, 80, 18, 1876, 307, 2, 14, 62, 2, 81, 75, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
[60, 42, 2, 38, 159, 60, 15, 207, 34, 236, 5283, 14, 5, 77, 5, 23, 431, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
[29, 2, 14, 114, 157, 70, 169, 61, 156, 13, 66, 1914, 6, 115, 11, 5, 280, 245, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
[29, 0, 0, 16, 72, 75, 7, 9, 55, 6, 12, 5, 1110, 416, 0, 1, 144, 44, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
[69, 5, 1, 73, 224, 440, 65, 46, 336, 38, 137, 55, 244, 5382, 6, 8, 1088, 331, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
[5, 1, 1, 33, 34, 21, 11, 10, 42, 2, 12, 17, 0, 32, 644, 0, 49, 83, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
[24, 2, 0, 20, 83, 45, 4, 34, 8, 107, 97, 8, 11, 39, 1, 1476, 23, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
[172, 8, 3, 100, 238, 337, 43, 162, 160, 48, 554, 84, 62, 835, 10, 9, 5481, 381, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
[102, 18, 27, 233, 675, 570, 253, 149, 390, 26, 259, 209, 29, 580, 62, 14, 1203, 6059, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, emptyStroke, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var offset = Math.PI * (emptyStroke/(respondents + emptyStroke)) / 2;


function drawChordWithMatrix(matrix){
	var offset = Math.PI * (emptyStroke/(respondents + emptyStroke)) / 2;

	//create a chord layout object and then call additional methods on the layout object to change the default settings
	var chord = d3.layout.chord()
		.padding(.02)
		.sortSubgroups(d3.descending) //sort the chords inside an arc from high to low
		.sortChords(d3.descending) //which chord should be shown on top when chords cross. Now the biggest chord is at the bottom
		.matrix(matrix_T2_T3);

	var arc = d3.svg.arc()
		.innerRadius(innerRadius)
		.outerRadius(outerRadius)
		.startAngle(startAngle)//startAngle and endAngle now include the offset in degrees
		.endAngle(endAngle);

	var path = d3.svg.chord()
		.radius(innerRadius)
		.startAngle(startAngle) //startAngle and endAngle now include the offset in degrees
		.endAngle(endAngle);
		
	var fill = d3.scale.ordinal()
	    .domain(d3.range(Names.length))
	    .range(["#C4C4C4","#C4C4C4","#C4C4C4","#EDC951","#CC333F","#00A0B0"]);

	////////////////////////////////////////////////////////////
	//////////////////// Draw outer Arcs ///////////////////////
	////////////////////////////////////////////////////////////

	//The group data objects are accessed by calling .groups() on the chord layout after the data matrix has been set
	var g = wrapper.selectAll("g.group")
		.data(chord.groups)
		.enter().append("g")
		.attr("class", "group")
		.on("mouseover", fade(opacityLow))
		.on("mouseout", fade(opacityDefault));


	g.append("path")
		.style("stroke", function(d,i) { return (Names[i] === '' ? "none" : (i > Names.length/2-1 ? "#00A1DE" : "#fad201")); })
		.style("fill", function(d,i) { return (Names[i] === '' ? "none" : (i > Names.length/2-1 ? "#00A1DE" : "#fad201")); })
		.style("pointer-events", function(d,i) { return (Names[i] === "" ? "none" : "auto"); })
		.attr("d", arc);

	////////////////////////////////////////////////////////////
	////////////////////// Append Names ////////////////////////
	////////////////////////////////////////////////////////////

	g.append("text")
		.each(function(d) { d.angle = ((d.startAngle + d.endAngle) / 2) + offset;})
		.attr("dy", ".35em")
		.attr("class", "titles")
		.attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
		.attr("transform", function(d,i) { 
			var c = arc.centroid(d);
			return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
			+ "translate(" + (innerRadius + 55) + ")"
			+ (d.angle > Math.PI ? "rotate(180)" : "")
		})
		.text(function(d,i) { return Names[i]; });

	//+ "translate(" + (innerRadius + 55) + ")"

	////////////////////////////////////////////////////////////
	//////////////////// Draw inner chords /////////////////////
	////////////////////////////////////////////////////////////
	 
	//var colors = ["#00A0B0","#CC333F","#EDC951"];
	var chords = wrapper.selectAll("path.chord")
		.data(chord.chords)
		.enter().append("path")
		.attr("class", "chord")
		.style("stroke", "none")
		.style("fill", "#C4C4C4")
		//.style("fill", function(d,i) { return fill(d.target.index); })
		.style("opacity", function(d) { return (Names[d.source.index] === '' ? 0 : opacityDefault); }) //Make the dummy strokes have a zero opacity (invisible)
		.style("pointer-events", function(d,i) { return (Names[d.source.index] === '' ? "none" : "auto"); }) //Remove pointer events from dummy strokes
		.attr("d", path)
		.on("mouseover", fadeOnChord)
		.on("mouseout", fade(opacityDefault));		


	////////////////////////////////////////////////////////////
	///////////////////////// Tooltip //////////////////////////
	////////////////////////////////////////////////////////////

	//Arcs
	g.append("title")	
		.text(function(d, i) {return Math.round(d.value) + " people in " + Names[i];});

		
	//Chords
	chords.append("title")
		.text(function(d) {
			return [Math.round(d.source.value), " people from ", Names[d.target.index], " to ", Names[d.source.index]].join(""); 
		});

}

function updateChordWithMatrix(matrix) {
	d3.select('#chart').select("svg").remove()
	svg = d3.select("#chart").transition()
	drawChordWithMatrix(matrix)
}

////////////////////////////////////////////////////////////
////////////////// Extra Functions /////////////////////////
////////////////////////////////////////////////////////////

//Include the offset in de start and end angle to rotate the Chord diagram clockwise
function startAngle(d) { return d.startAngle + offset; }
function endAngle(d) { return d.endAngle + offset; }

// Returns an event handler for fading a given chord group
function fade(opacity) {
  return function(d, i) {
	wrapper.selectAll("path.chord")
		.filter(function(d) { return d.source.index !== i && d.target.index !== i && Names[d.source.index] !== ''; })
		.transition()
		.style("opacity", opacity);
  };
}//fade

// Fade function when hovering over chord
function fadeOnChord(d) {
	var chosen = d;
	wrapper.selectAll("path.chord")
		.transition()
		.style("opacity", function(d) {
			return d.source.index === chosen.source.index && d.target.index === chosen.target.index ? opacityDefault : opacityLow;
		});
}//fadeOnChord

// d3.select("#WomenOnlyButton").on("click", function () {
//     drawChordWithMatrix(matrix_T1_T2);
//     console.log("Women only");
//     //enable other buttons, disable this one
//     disableButton(this);
// });

// d3.select("#MenOnlyButton").on("click", function() {
// 	d3.select("#"+containerID).select("svg").remove();
// 	var svg = d3.select("#"+containerID)
//     drawChordWithMatrix(matrix_T2_T3);
//     console.log("Men only");
//     disableButton(this);
// });

// function disableButton(buttonNode) {
//     d3.selectAll("button")
//         .attr("disabled", function(d) {
//             return this === buttonNode? "true": null;
//         });
// }


drawChordWithMatrix(matrix_T2_T3)
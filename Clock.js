window.onload= function (){

	var paper = new Raphael( 100, 100, 400, 500); //add paper 400 by 500
	var backGround = paper.rect(0, 0, 400, 500); //add background
    backGround.attr({ fill: "black", stroke: outline1 }); // colour background
	var outerface = paper.circle(200,200,115); //add outer face
    var face = paper.circle(200, 200, 100); //add face
    var display = paper.text(200, 250); //Digital time display
    var outline1 = "#33cc33"; //Main green colour
    var outline2 = '#cc0000'; //Secondary red colour
    var ampmtxt = paper.text(200, 275); //AM/PM text
    var t = 0; //variable used to tell the analogue and digital time whether to use realtime or set time
    paper.text(200, 92, '12').attr({ fill: outline1 }); //12th hour on clockface
    paper.text(307, 200, '3').attr({ fill: outline1 }); //3rd hour on clockface
    paper.text(200, 306, '6').attr({ fill: outline1 }); //6th hour on clockface
    paper.text(93, 200, '9').attr({ fill: outline1 }); //9th hour on clockface
		/* Comment - Add your code here*/

		face.attr({ fill : "black", stroke: outline1 }); // colour face
		outerface.attr({fill: "black", stroke: outline1}); //colour outer face
		var seconds = paper.rect(197.5,200,5,100); // secondhand
		seconds.attr({stroke: outline2}); //colour secondhand
		var minutes = paper.rect(195,200,10,90); //minute hand
		minutes.attr({stroke: outline1}); //colour minute hand
		var hours = paper.rect(195,200,10,50); //hours hand
		hours.attr({stroke: outline1}); //colour hours hand
				
        var h; //global hour variable
        var m; //global minute variable
        var s; //global second variable

		//Real Time method		
        function startTime2() {
            if (t == 0) {
                //h, m and s are assigned to the real time
                var today = new Date();
                 h = today.getHours();
                 m = today.getMinutes();
                 s = today.getSeconds();
            }
            if (t == 1) {   
                //h, m and s are assigned to the set time
                 h = hSetTime;
                 m = mSetTime;
                 s = sSetTime;               
            }

			seconds.animate({transform: [ 'r',((s*6) + 180),200,200]}); //secondhand animation
			minutes.animate({transform: ['r',((m*6) + 180),200,200]});  //minute hand animation
			hours.animate({transform: ['r',((h*30) + 180),200,200]});   //hours hand animation		
			
			setTimeout(function(){startTime2()}, 250); //funtion refreshes at 1/4 second intervals

            //Changes the AM/PM text depending on the time
			if (h < 12){
                ampmtxt.attr({text: "AM", "font-size": 15, fill: outline1 });
			} else {
                ampmtxt.attr({text: "PM" , "font-size": 15, fill: outline1});
			}	
		}		
		
		//Text time method
		function startDigiTime(){
            var today = new Date(); //PC clock time
            if (t == 0) {
                h = today.getHours(); //PC clock time
                m = today.getMinutes(); //PC clock time
                s = today.getSeconds(); //PC clock time
            }
            if (t == 1) {
                h = hSetTime; //Set time
                m = mSetTime; //Set time
                s = sSetTime; //Set time
            }
            m = checkTime(m); //If m < 10 the digitime shows 0 before the number
            s = checkTime(s); //If s < 10 the digitime shows 0 before the number

            //Sets anything above 13 hours to 12 hour clock
            var htemp = h;
            if (h >= 13) {
                htemp = h - 12;
            }
            //Set 0 hours to 12am
            if (h == 0) {
                htemp = 12;
            }
            htemp = checkTime(htemp);
            var time = htemp + " : " + m + " : " + s;           
            display.attr({ text: time, fill: outline1, "font-size": 15 });

			setTimeout(function(){startDigiTime()}, 250);            
		}
		function checkTime(i) {
			if (i < 10) {i = "0" + i};
			return i;
		}
		
		var centSW = 0; //Stopwatch centisecond
		var secSW = 0; //Stopwatch second
		var minSW = 0; //stopwatch minute
		var displayStopWatch = paper.text(200, 400, "00 : 00 : 00"); //Stopwatch display	
		displayStopWatch.attr({fill: outline1, "font-size": 20}); //Stopwatch display attributes
		var swTicker = 0; //swTicker is used to change the timeout rate when the start button is pressed
        var swtimeout; //Variable used to define the timout function so that it can be started/stopped/reset
        
		//Stopwatch
		function startStopWatch(){
            //The stopwatch uses quarter second intervals as to not accidentally skip seconds
            centSW = centSW + 25;
            //When the cent value reaches 100 it resets to 0 and the second value increases by 1
            if (centSW > 99) {
				secSW = secSW + 1;
				centSW = 0;
            }
            //When the second value reaches 60 it resets to 0 and the minute hand increases by 1
		 	if (secSW > 59) {
				minSW = minSW + 1;
				secSW = 0;
            }
             //Temp variables used to add a zero if the value is bellow 10
              var minSWtemp = checkTime(minSW);
              var secSWtemp = checkTime(secSW);
              var centSWtemp = checkTime(centSW);
             var swtxt = minSWtemp + " : " + secSWtemp + " : " + centSWtemp;	
			 displayStopWatch.attr({text: swtxt});
			 swtimeout = setTimeout(function(){startStopWatch()}, swTicker);
		
		}
		//StopWatch buttons and text
        var swText = paper.text(200, 365, 'Stopwatch'); //Stopwatch title
        swText.attr({fill: 'black', stroke: outline1 , 'font-size': 25 }); //Stopwatch title and attributes
		var startBtnTxt = paper.text(150, 450, 'Start'); //start button text
        startBtnTxt.attr({ fill: outline1 }); //Start button text attributes
        var startBtn = paper.circle(150, 450, 20); //START button
        startBtn.attr({ fill: "black", stroke: outline1, 'fill-opacity': 0 });//Start button attributes		
		var stopBtnTxt = paper.text(200, 450, 'Stop'); // stop button text
        stopBtnTxt.attr({ fill: outline2 }); // Stop button text attributes
        var stopButton = paper.circle(200, 450, 20); // STOP button
        stopButton.attr({ fill: "black", stroke: outline2, 'fill-opacity': 0 }); // stop button attributes         
        var resetBtnTxt = paper.text(250, 450, 'Reset'); // reset button text
        resetBtnTxt.attr({ fill: outline2 }); // reset button text attributes
        var resetButton = paper.circle(250, 450, 20); // RESET button
        resetButton.attr({ fill: "black", stroke: outline1, 'fill-opacity': 0 }); // reset button attributes 
		
		var x = 0; //x is a value used to tell the start button what to do. If x = 0, the clock is stopped so it can be started, else nothing happens
        //Start Button. Sets the stopwatches timeout iterations to 10 milliseconds, i.e 1 centisecond
        startBtn.click(function () {       
            if (x == 0) {
                //Stopwatch intervals is set to 1/4 seconds and the function starts
				swTicker = 250;				
				startStopWatch();
			}           
			x = 1;									
		});
		//Stop Button. clears the stopwatches timeout iterations so the time stops		
		stopButton.click(function() {
            if (x == 1)
                clearTimeout(swtimeout);
            
			x = 0;
		});
        //Reset Button. 
        resetButton.click(function () {
            clearTimeout(swtimeout);
            centSW = 0;
            secSW = 0;
            minSW = 0;
            displayStopWatch.attr({ text: "00 : 00 : 00" });
            x = 0;
        });
	    //Time change arrows UP
        var hUpArrow = paper.path("M 280 25 l 10 -20 l 10 20 z");
        hUpArrow.attr({ fill: 'black', stroke: outline1 });
        var mUpArrow = paper.path("M 315 25 l 10 -20 l 10 20 z");
        mUpArrow.attr({ fill: 'black', stroke: outline1 });
        var sUpArrow = paper.path("M 350 25 l 10 -20 l 10 20 z");
        sUpArrow.attr({ fill: 'black', stroke: outline1 });

        //Time change arrows DOWN
        var hDownArrow = paper.path("M 280 60 l 10 20 l 10 -20 z");
        hDownArrow.attr({fill: 'black', stroke: outline1 });
        var mDownArrow = paper.path("M 315 60 l 10 20 l 10 -20 z");
        mDownArrow.attr({ fill: 'black', stroke: outline1 });
        var sDownArrow = paper.path("M 350 60 l 10 20 l 10 -20 z");
        sDownArrow.attr({ fill: 'black', stroke: outline1 });
        //Initialise the set time text, named setTimeTxt
        var setTimeTxt = paper.text(325, 44, '00 : 00 : 00');
        setTimeTxt.attr({ fill: outline1, "font-size": 18 });
        var hSet = 0;
        var mSet = 0;
        var sSet = 0;
        var hSetTemp = "00";
        var mSetTemp = "00";
        var sSetTemp = "00";
        //UP ARROWS, when clicked they increase the assigned value (hSet, mSet, sSet) by 1
        hUpArrow.click(function () {
            if (hSet < 23) {
                hSet++;
            }
            hSetTemp = checkTime(hSet); 
            setTimeTxt.attr({text: hSetTemp + " : " + mSetTemp + " : " + sSetTemp});
        });
        mUpArrow.click(function () {
            if (mSet < 59) {
                mSet++;
            }
            mSetTemp = checkTime(mSet);
            setTimeTxt.attr({ text: hSetTemp + " : " + mSetTemp + " : " + sSetTemp });
            seconds.add();
        });
        sUpArrow.click(function () {
            if (sSet < 59) {
                sSet++;
            }
            sSetTemp = checkTime(sSet);
            setTimeTxt.attr({ text: hSetTemp + " : " + mSetTemp + " : " + sSetTemp });
        });
        //DOWN ARROWS, when clicked they decrease the assigned value (hSet, mSet, sSet) by 1
        hDownArrow.click(function () {
            if (hSet > 0) {
                hSet--;
            }
            hSetTemp = checkTime(hSet);
            setTimeTxt.attr({ text: hSetTemp + " : " + mSetTemp + " : " + sSetTemp });
        });
        mDownArrow.click(function () {
            if (mSet > 0) {
                mSet--;
            }
            mSetTemp = checkTime(mSet);
            setTimeTxt.attr({ text: hSetTemp + " : " + mSetTemp + " : " + sSetTemp });
        });
        sDownArrow.click(function () {
            if (sSet > 0) {
                sSet--;
            }
            sSetTemp = checkTime(sSet);
            setTimeTxt.attr({ text: hSetTemp + " : " + mSetTemp + " : " + sSetTemp });
        });

        //Go button and text
        var goBtnTxt = paper.text(225, 45, 'Go');
        goBtnTxt.attr({ fill: outline1, 'font-size': 15 });
        var goBtn = paper.circle(225, 45, 20);
        goBtn.attr({ fill: 'black', stroke: outline1, 'fill-opacity': 0 });
        //The (x)SetTime variables are used to set the global time vaules
        var sSetTime = 0;
        var mSetTime = 0;
        var hSetTime = 0;
        var setTimeTO; //Name assigned to the timeout function of the startSetTime function
        //If t = 1 the startSetTime function will increase the sSetTime value by 1 every second. 
        function startSetTime() { 
            if (t == 1) {
                sSetTime++;
                if (sSetTime > 59) { //When sSetTime reaches 1 minute it resets to 0 the mSetTime value increases by 1
                    mSetTime++;
                    sSetTime = 0;
                }
                if (mSetTime > 59) { //When mSetTime reaches 1 hour it resets to 0 the hSetTime value increases by 1
                    hSetTime++;
                    mSetTime = 0;
                }
                if (hSetTime > 23) { //When hSetTime reaches 24 hours its value resets
                    hSetTime = 0;
                }               
            }
         setTimeTO = setTimeout(function () { startSetTime() }, 1000); //1 second intervals
        }       
        //When clicked, the Go button resets the set time intervals and the starts the set time.
        goBtn.click(function () {
                clearTimeout(setTimeTO);    
                startSetTime();
                t = 1; 
            //the values that are set using the arrows are assigned to the SetTime values.
            sSetTime = sSet;
            mSetTime = mSet;
            hSetTime = hSet;           
            
        });
        //Reset Button and text        
        var resetTimeBtnTxt = paper.text(175, 45, 'Reset');
        resetTimeBtnTxt.attr({ fill: outline2, 'font-size': 13 });
        var resetTimeBtn = paper.circle(175, 45, 20);
        resetTimeBtn.attr({ fill: 'black', stroke: outline1, 'fill-opacity': 0 });
        //Reset button clears the interval in the startSetTime() function
        resetTimeBtn.click(function () {
            clearTimeout(setTimeTO);
            t = 0;
        });
             
     
        //This function creates a 20 seconds animation of 2 large asteroids (bigRockA & bigRockC)
        //Each asteroid has a 10 second animation and at the end of their animation the asteroids are removed
        function largeAsteroidsA() {
            var bigRockA = paper.path("M -50 -20 l 6 15 l -8 13 l 10 9 l 10 -3 l 10 1 l 11 -10 l -5 -12 l 7 -5 l -7 -12 l -8 3 l -8 -4 Z");
            bigRockA.attr({ fill: 'black', stroke: 'white' });           
            var bigRockC = paper.path("M -50 400 l 6 15 l -8 13 l 10 9 l 10 -3 l 10 1 l 11 -10 l -5 -12 l 7 -5 l -7 -12 l -8 3 l -8 -4 Z");
            bigRockC.attr({ fill: 'black', stroke: 'white' });           
            bigRockA.animate({
                path: 'M 500 300 l 6 15 l -8 13 l 10 9 l 10 -3 l 10 1 l 11 -10 l -5 -12 l 7 -5 l -7 -12 l -8 3 l -8 -4 Z',
                transform: 'r' + 180
            }, 10000, function () {
                bigRockA.remove();
                bigRockC.animate({
                    path: 'M 500 100 l 6 15 l -8 13 l 10 9 l 10 -3 l 10 1 l 11 -10 l -5 -12 l 7 -5 l -7 -12 l -8 3 l -8 -4 Z',
                    transform: 'r' + 180
                }, 10000, function () {
                    bigRockC.remove();
                    a = 0; //After the asteroid button is pressed, it cannot be pressed again until the second large asteroid is removed
                });                   
            }
            );            
        }
        //This function creates a 15 seconds animation of 2 medium asteroids (medRockA & medRockC)
        //Each asteroid has a 7.5 second animation and at the end of their animation the asteroids are removed
        function medAsteroidsA() {
            var medRockA = paper.path("M -25 500 l 1 10 l -3 8 l 5 4 l 5 0 l 5 0 l 6 -5 l 0 -7 l 2 0 l -2 -7 l -3 0 l -3 0 Z");
            medRockA.attr({ fill: 'black', stroke: 'white' });   
            var medRockC = paper.path("M -25 100 l 1 10 l -3 8 l 5 4 l 5 0 l 5 0 l 6 -5 l 0 -7 l 2 0 l -2 -7 l -3 0 l -3 0 Z");
            medRockC.attr({ fill: 'black', stroke: 'white' });   
            medRockA.animate({
                path: "M 350 -50 l 1 10 l -3 8 l 5 4 l 5 0 l 5 0 l 6 -5 l 0 -7 l 2 0 l -2 -7 l -3 0 l -3 0 Z",
                transform: 'r' + 180
            }, 7500, function () {
                medRockA.remove();
                medRockC.animate({
                    path: "M 450 325 l 1 10 l -3 8 l 5 4 l 5 0 l 5 0 l 6 -5 l 0 -7 l 2 0 l -2 -7 l -3 0 l -3 0 Z",
                    transform: 'r' + 180
                }, 7500, function () {
                    medRockC.remove();
                });
            }

            )
        }
        //This function creates a 10 seconds animation of 2 small asteroids (smlRockA & smlRockC)
        //Each asteroid has a 5 second animation and at the end of their animation the asteroids are removed
        function smlAsteroidsA() {
            var smlRockA = paper.path("M -25 550 l 0 7 l 0 5 l 2 1 l 2 0 l 2 0 l 3 -2 l 0 -4 l 1 -1 l 0 -4 l -3 1 l -1 -4 Z");
            smlRockA.attr({ fill: 'black', stroke: 'white' });   
            var smlRockC = paper.path("M 400 -25 l 0 7 l 0 5 l 2 1 l 2 0 l 2 0 l 3 -2 l 0 -4 l 1 -1 l 0 -4 l -3 1 l -1 -4 Z");
            smlRockC.attr({ fill: 'black', stroke: 'white' });  
            smlRockA.animate({
                path: "M 100 -25 l 0 7 l 0 5 l 2 1 l 2 0 l 2 0 l 3 -2 l 0 -4 l 1 -1 l 0 -4 l -3 1 l -1 -4 Z",
                transform: 'r' + 240
            }, 5000, function () {
                smlRockA.remove();
                smlRockC.animate({
                    path: "M -25 400 l 0 7 l 0 5 l 2 1 l 2 0 l 2 0 l 3 -2 l 0 -4 l 1 -1 l 0 -4 l -3 1 l -1 -4 Z",
                    transform: 'r' + 240
                }, 5000, function () {
                    smlRockC.remove();
                    
                });
            }

            )
        }
 
        var a = 0; // a is used to stop the ASTEROIDS button from being pressed again. until the last asteroid disappears

        //ASTEROIDS button and text
        var asteroidsOnTxt = paper.text(70, 45, "ASTEROIDS");
        asteroidsOnTxt.attr({ fill: 'white', 'font-size': 15 });
        var asteroidsON = paper.rect(23, 25, 95, 40);
        asteroidsON.attr({ fill: "black", stroke: 'white', 'fill-opacity': 0, 'stroke-width': 2,});
        //ASTEROIDS BUTTON
        //Once clicked it cannot be pressed again until a = 0, i.e the second large asteroid completes its animation
        //The button starts the 3 funtions of animated asteroids
        asteroidsON.click(function () {
            if (a == 0) {               
                largeAsteroidsA();                
                medAsteroidsA();              
                smlAsteroidsA();               
                a = 1;
            }            
        });

	    var center = paper.circle(197.5 ,200,7);//add center
        center.attr({ fill: "black", stroke: outline1 }); //colour center
        startTime2();
        startDigiTime();
	
	
	//www.digitalocean.com/community/tutorials/understanding-date-and-time-in-javascript

}


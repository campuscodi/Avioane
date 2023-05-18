

var gridx = 16, gridy = 16;
var jucator = [], computer = [];
var avioaneleJucatorului = [], avioaneleComputerului = [];
var vietileJucatorului = 0, vietileComputerului = 0;
var scorulJucatorului =  0;
var scorulComputerului = 0;
var pozitii = [];
var incarcat = [];
var avionulSelectat = 1;
var jflag = true;
var  statusmsg = "";

/* SUS */
pozitii[0] = new Array();
pozitii[0][0] = [-2,1];
pozitii[0][1] = [-1,1];
pozitii[0][2] = [ 0,1];
pozitii[0][3] = [ 1,1];
pozitii[0][4] = [ 2,1];
pozitii[0][5] = [ 0,2];
pozitii[0][6] = [-1,3];
pozitii[0][7] = [ 0,3];
pozitii[0][8] = [ 1,3];

/* JOS */
pozitii[1] = new Array();
pozitii[1][0] = [-2,-1];
pozitii[1][1] = [-1,-1];
pozitii[1][2] = [ 0,-1];
pozitii[1][3] = [ 1,-1];
pozitii[1][4] = [ 2,-1];
pozitii[1][5] = [ 0,-2];
pozitii[1][6] = [-1,-3];
pozitii[1][7] = [ 0,-3];
pozitii[1][8] = [ 1,-3];

/* STANGA */
pozitii[2] = new Array();
pozitii[2][0] = [1,-2];
pozitii[2][1] = [1,-1];
pozitii[2][2] = [1, 0];
pozitii[2][3] = [1, 1];
pozitii[2][4] = [1, 2];
pozitii[2][5] = [2, 0];
pozitii[2][6] = [3,-1];
pozitii[2][7] = [3, 0];
pozitii[2][8] = [3, 1];

/* DREAPTA */
pozitii[3] = new Array();
pozitii[3][0] = [-1,-2];
pozitii[3][1] = [-1,-1];
pozitii[3][2] = [-1, 0];
pozitii[3][3] = [-1, 1];
pozitii[3][4] = [-1, 2];
pozitii[3][5] = [-2, 0];
pozitii[3][6] = [-3,-1];
pozitii[3][7] = [-3, 0];
pozitii[3][8] = [-3, 1];

/*****************************/

function loadImages() {
  const ids = ["e", "avion", "t", "d", "m"];
  console.log = "Loading images... Please wait...";
  for (const element of ids) {
    let img = new Image();
    let name = "av" + element + ".gif";
    img.src = name;
    // Assign the loaded image to a global variable or use it as needed
  }
  console.log = "Done";
}

function reiaJocul(){
	document.getElementById("reiaJoculButton").style.display="none";
	document.getElementById("setupTable").style.display="";
	document.getElementById("zonaJucatorului").innerHTML="";
	document.getElementById("zonaComputerului").innerHTML="";
	preview();
}

function preview() {
  jucator = initializePlayer(true);
  if (jucator) displayGrid(false);
}

function startGame() {
  if (!(jucator = initializePlayer())) return;
  if (!(computer = initializeComputer())) return;

  jflag = true;
  document.getElementById("setupTable").style.display = "none";
  document.getElementById("vietileJucatorului").innerHTML = vietileJucatorului;
  document.getElementById("vietileComputerului").innerHTML = vietileComputerului;
  displayGrid(true);
  displayGrid(false);
}


function initializePlayer(preview) {
    var y, x;
	var x, y, i, j, ok, varfx, varfy, nrAvion = 0;

	//if(previzualizeaza=="undefined") previzualizeaza=false;

    grid = [];
    for (y=0;y<gridx;++y) {
        grid[y] = [];
        for (x=0;x<gridx;++x)
            grid[y][x] = ["e", -1, 0];
    }

	vietileJucatorului=0;

	for (j=1;j<6;j++)
	{
		varfx=document.getElementById("pozx"+j).value;
		varfy=document.getElementById("pozy"+j).value;

		if(varfx=="" || varfy==""){
			if(!preview){
				alert("Fill in the board with 5 planes!!!");
				return false;
			}
			else
				continue;
		}

		varfx = parseInt(varfx)-1;
		varfy = parseInt(varfy)-1;

		orientare = parseInt(document.getElementById("dir"+j).value);

		/* verificarea pozitiei avionului*/

		if(varfx<0 || varfx>=gridx || varfy<0 || varfy>=gridy || grid[varfy][varfx][0] == "a"){
			alert("Plane "+j+" was not set right!!!");
			document.getElementById("pozx"+j).focus();
			return false;
		}

		for(p=0;p<9;p++){
			pozx = pozitii[orientare][p][0]+varfx;
			pozy = pozitii[orientare][p][1]+varfy;

			if( pozx >= gridx || pozx < 0 || pozy >= gridy || pozy < 0  ){
			alert("Plane "+j+" was not set right!!!");
				document.getElementById("pozx"+j).focus();
				return false;
			}

			if (grid[pozy][pozx][0]=="a") {
				alert("Plane "+j+" overlaps another plane!!!");
				document.getElementById("pozx"+j).focus();
				return false;
			}
		}

		for(p=0;p<9;p++){
			pozx = pozitii[orientare][p][0]+varfx;
			pozy = pozitii[orientare][p][1]+varfy;
			grid[pozy][pozx][0] = "a";
			grid[pozy][pozx][1] = nrAvion;
		}
		grid[varfy][varfx][0] = "a";
		grid[varfy][varfx][1] = nrAvion;
		grid[varfy][varfx][2] = "cap";

		avioaneleJucatorului[nrAvion] = 10;
		vietileJucatorului++;
        nrAvion++;
	}
    return grid;
}

function initializeComputer() {
    var y,x;
    grid = [];
    for (y=0;y<gridx;++y) {
        grid[y] = [];
        for (x=0;x<gridx;++x)
            grid[y][x] = ["e", -1, 0];
    }
	var x,y,i,j,ok,varfx,varfy,nrAvion=0;
	vietileComputerului=0;
	for (j=0;j<5;j++)
	{
		do{
			varfx=Math.floor(Math.random()*12+2);
			varfy=Math.floor(Math.random()*12+2);
			orientare = Math.round(Math.random()*3);
			ok=true;

			/* verificarea pozitiei avionului*/
			if(grid[varfy][varfx][0] == "a"){ok=false;continue;}

			for(p=0;p<9;p++){
				pozx = pozitii[orientare][p][0]+varfx;
				pozy = pozitii[orientare][p][1]+varfy;
				if( (pozx >= gridx || pozx < 0) || (pozy >= gridy || pozy < 0)  ){
					ok=false;break;
				}

				if (grid[pozy][pozx][0]=="a") {
					ok=false;break;
				}
			}

		}while(!ok);

		for(p=0;p<9;p++){
			pozx = pozitii[orientare][p][0]+varfx;
			pozy = pozitii[orientare][p][1]+varfy;
			grid[pozy][pozx][0] = "a";
			grid[pozy][pozx][1] = nrAvion;
		}
		grid[varfy][varfx][0] = "a";
		grid[varfy][varfx][1] = nrAvion;
		grid[varfy][varfx][2] = "cap";

		avioaneleComputerului[nrAvion] = 10;
		vietileComputerului++;
        nrAvion++;
	}
    return grid;
}


function seteazaImaginea(y,x,id,ispc) {
    if ( ispc ) {
        computer[y][x][0] = id;
        document.images["pc"+y+"_"+x].src = "av"+id+".gif";
    }
    else {
        jucator[y][x][0] = id;
        document.images["ply"+y+"_"+x].src = "av"+id+".gif";
    }
}

function displayGrid(ispc) {
var y,x;
s='<div class="pixel"></div>';
 for(y=0;y<gridy;y++) {
	s += '<div class="pixel">'+(y+1)+'</div>';
 }
 s+='<div style="clear:left;"></div>';
 if ( ispc ){
     for (y=0;y<gridy;y++) {
		s+='<div class="pixel">'+(y+1)+'</div>';
        for (x=0;x<gridx;x++) {
                s += '<a href="javascript:gridClick('+y+','+x+');"><img name="pc'+y+'_'+x+'" src="ave.gif" width=16 height=16></a>';
		}
		s += '<br>';
	 }
 } else {
     for (y=0;y<gridy;y++) {
		s+='<div class="pixel">'+(y+1)+'</div>';
        for (x=0;x<gridx;x++) {
                s += '<a href="javascript:jucatorGridClick('+y+','+x+');"><img name="ply'+y+'_'+x+'" src="av'+jucator[y][x][0]+'.gif" width=16 height=16></a>';
		}
		s+='<br>';
	 }
 }

if(ispc)
	document.getElementById("zonaComputerului").innerHTML = "<center>Computer</center>"+s;
else
	document.getElementById("zonaJucatorului").innerHTML = "<center>Jucator</center>"+s;
}

function jucatorGridClick(y,x){
	if(avionulSelectat){
		document.getElementById("pozx"+avionulSelectat).value=x+1;
		document.getElementById("pozy"+avionulSelectat).value=y+1;
		preview();
	}
}

function gridClick(y,x) {
    if ( jflag ) {
	if ((computer[y][x][2]=="cap") && (computer[y][x][0]=="a")){
            var nrAvion = computer[y][x][1];
            avioaneleComputerului[nrAvion]=0;
            doboara(computer,nrAvion,true);
            alert("You struck down one of the opponent's planes!!!");
            if ( --vietileComputerului == 0 ) {
                alert("YOU WON!!! CONGRATS :)");
				scorulJucatorului++;
				document.getElementById("scorulJucatorului").innerHTML=scorulJucatorului;
				document.getElementById("reiaJoculButton").style.display="";
                jflag = false;
            }
			document.getElementById("vietileComputerului").innerHTML=vietileComputerului;
		} else
		if (computer[y][x][0]=="a") {
            seteazaImaginea(y,x,"t",true);
            var nrAvion = computer[y][x][1];
            if ( --avioaneleComputerului[nrAvion] == 0 ) {
            doboara(computer,nrAvion,true);
            alert("TI-A FOST DOBORAT UN AVION!!!");
            if ( --vietileComputerului == 0 ) {
                alert("YOU LOST!!! :(");
                jflag = false;
				scorulJucatorului++;
				document.getElementById("scorulJucatorului").innerHTML=scorulJucatorului;
				document.getElementById("reiaJoculButton").style.display="";
            }
			document.getElementById("vietileComputerului").innerHTML=vietileComputerului;
        }


        if ( jflag ) computerGridClick();
    }
    else if (computer[y][x][0] == "e") {
        seteazaImaginea(y,x,"m",true);
        computerGridClick();
     }
    }
}

function computerGridClick() {
    var x,y,pass;
    var sx,sy;
    var selected = false;

    for (pass=0;pass<2;++pass) {
        for (y=0;y<gridy && !selected;++y) {
            for (x=0;x<gridx && !selected;++x) {
                if (jucator[y][x][0]=="t") {
                    sx=x; sy=y;
                    if ( pass == 0 ) {
                        if ( (x+2<gridx) && (jucator[y][x+1][0]=="t") && ((jucator[y][x+2][0]=="a")||(jucator[y][x+2][0]=="e")))
									{ sx = x+2; selected=true; }
						else if ( (x-1>=0) && (x+1<gridx) && (jucator[y][x+1][0]=="t") && ((jucator[y][x-1][0]=="a")||(jucator[y][x-1][0]=="e")))
									{ sx = x-1; selected=true; }
						else if ( (y-1>=0) && (y+1<gridy) && (jucator[y+1][x][0]=="t") && ((jucator[y-1][x][0]=="a")||(jucator[y-1][x][0]=="e")))
									{ sy = y-1; selected=true; }
						else if ( (y+2<gridy) && (jucator[y+1][x][0]=="t") && ((jucator[y+2][x][0]=="a")||(jucator[y+2][x][0]=="e")))
									{ sy = y+2; selected=true; }
                    }
                    else {
                        if ( (x-1>=0) && ((jucator[y][x-1][0]=="a")||(jucator[y][x-1][0]=="e")))
									{ sx = x-1; selected=true; }
                        else if ( (x+1<gridx) && ((jucator[y][x+1][0]=="a")||(jucator[y][x+1][0]=="e")))
									{ sx = x+1; selected=true; }
                        else if ( (y-1>=0) && ((jucator[y-1][x][0]=="a")||(jucator[y-1][x][0]=="e")))
									{ sy = y-1; selected=true; }
                        else if ( (y+1<gridy) && ((jucator[y+1][x][0]=="a")||(jucator[y+1][x][0]=="e")))
									{ sy = y+1; selected=true; }
                    }
                }
            }
        }
    }

    if ( !selected ) {
        do{
            sy = Math.floor(Math.random() * (gridy-1));
            sx = Math.floor(Math.random() * (gridx-1));
        } while( (jucator[sy][sx][0]=="t") || (jucator[sy][sx][0]=="d") || (jucator[sy][sx][0]=="m") );
    }

   if ((jucator[sy][sx][2]=="cap") && (jucator[sy][sx][0]=="a")) {
            seteazaImaginea(sy,sx,"t",false);
            var nrAvion = jucator[sy][sx][1];
            avioaneleJucatorului[nrAvion]=0;
            doboara(jucator,nrAvion,false);
            alert("One of your planes was struck down!");
            if ( --vietileJucatorului == 0 ) {
				afiseazaDusmanul();
                alert("YOU LOST :(\n");
                jflag = false;

				scorulComputerului++;
				document.getElementById("scorulComputerului").innerHTML=scorulComputerului;
				document.getElementById("reiaJoculButton").style.display="";

            }
		} else
		if (jucator[sy][sx][0]=="a") {
            seteazaImaginea(sy,sx,"t",false);
            var nrAvion = jucator[sy][sx][1];
            if ( --avioaneleJucatorului[nrAvion] == 0 ) {
            doboara(jucator,nrAvion,false);
            alert("One of your planes was struck down!!!");
            if ( --vietileJucatorului == 0 ) {
		        afiseazaDusmanul();
                alert("YOU LOST :(\n");
                jflag = false;

				scorulComputerului++;
				document.getElementById("scorulComputerului").innerHTML=scorulComputerului;
				document.getElementById("reiaJoculButton").style.display="";

            }
        }
    }
    else if (jucator[sy][sx][0] == "e") {
        seteazaImaginea(sy,sx,"m",false);
     }
	document.getElementById("vietileJucatorului").innerHTML=vietileJucatorului;
}


function doboara(grid,nrAvion,ispc) {
    var y,x;
    for (y=0;y<gridx;++y) {
        for (x=0;x<gridx;++x) {
            if ( grid[y][x][1] == nrAvion )
            if (ispc) seteazaImaginea(y,x,"d",true);
            else seteazaImaginea(y,x,"d",false);
        }
    }
}


function afiseazaDusmanul() {
    var y,x;
    for (y=0;y<gridx;++y) {
        for (x=0;x<gridx;++x) {
            if ( computer[y][x][0] == "t" )
            seteazaImaginea(y,x,"d",true);
            else if ( computer[y][x][0] == "a" )
            seteazaImaginea(y,x,"a",true);
        }
    }
}
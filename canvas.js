  
  var canvas;
  var ctx;
  var started = false;
  var coordinates = new Array(); 
  var click_drag = new Array();


  function add_click(coord, dragging)
  {
    coordinates.push(coord);
    click_drag.push(dragging);
  }

  function init(){
    canvas = document.getElementById("canvas");

    try {
      ctx = canvas.getContext("2d");
    }
    catch(error)
    {
      console.log(error);
    }
    started = false;
  }

  function get_coordinate(e)
  {
    try{
      var rect = document.getElementById("canvas").getBoundingClientRect();
      var root = document.documentElement;
      var canvas_x = e.clientX - rect.left - root.scrollLeft;
      var canvas_y = e.clientY - rect.top - root.scrollTop; 

      return {
       		x: canvas_x,
       		y: canvas_y
             };
    } catch(error) {
      console.log(error);
    }
    
    return null;
  }
  
  function display_coordinate(coord){
    document.getElementById("text").innerHTML="Coordinates: (" + coord.x + "," + coord.y + ")";
  }

  function clear_coordinate_text()
  {
    document.getElementById("text").innerHTML="";
  }


  function draw()
  {
    try 
    {
        ctx.beginPath();
        ctx.strokeStyle = "#F34BCE";
        ctx.lineJoin = "round";
        ctx.lineWidth = 1;

        for (var i=1; i < coordinates.length; i++)
        {
          ctx.moveTo(coordinates[i-1].x, coordinates[i-1].y);
          ctx.lineTo(coordinates[i].x, coordinates[i].y);
          ctx.stroke();
          ctx.closePath();
        
        }
      } catch (error) 
      {
        console.log(error);
      }
    }

    function mouse_down(){
      started = true;
    }
    function mouse_up(){
      started = false;
      coordinates = [];
    }


    function mouse_move(e){
      var coord = get_coordinate(e);
      display_coordinate(coord);
      if (started == true)
      {
        add_click(coord,true);
        draw();
      }
    }

    function clear(){
      canvas.width = canvas.width;
    }

$(document).ready(init);
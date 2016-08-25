////////// camera-page  ///////////////
$(document).on('pageinit','#compass-page',function(){
    console.log('compass page');
    
    $('#cmd_heading').click(function(){
        navigator.compass.getCurrentHeading(onSuccess, onError);
    });

});
/*
function onSuccess(heading) {
    console.log('compass page '+'Heading: ' + heading.magneticHeading);
    map.setOptions( {
    	zoom : 5,
center : new google.maps.LatLng(37.2, 136.1),
mapTypeId : google.maps.MapTypeId.ROADMAP
		} ) ;
};

function onError(error) {
    alert('CompassError: ' + error.code);
};
*/
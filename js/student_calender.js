var currentWeek = 0, table = document.getElementById("myTable");
myFunction(0);
function myFunction(e) {
	if(e == 1) {
		currentWeek = currentWeek + 1;
	}else if (e == -1){
		currentWeek = currentWeek - 1;
	}else {
		currentWeek = 0
	}
	var startOfWeek, endOfWeek;
	if(currentWeek == 0){
		 startOfWeek= moment().startOf('isoWeek');
		endOfWeek = moment().endOf('isoWeek');
	}else if(currentWeek > 0) {
		console.log(currentWeek);
		startOfWeek = moment().add(currentWeek, 'weeks').startOf('isoWeek')
		endOfWeek = moment().add(currentWeek, 'weeks').endOf('isoWeek')
	}else{
		startOfWeek = moment().subtract(currentWeek, 'weeks').startOf('isoWeek')
		endOfWeek = moment().subtract(currentWeek, 'weeks').endOf('isoWeek')
	}
	var days = [];
	var day = startOfWeek;

	while (day <= endOfWeek) {
		days.push(day.toDate());
		day = day.clone().add(1, 'd');
	}
	if(table.rows.length != 0) {
		removeRow();
	}
	for(var i = 0; i < days.length; i++){
		var row = table.insertRow(i);
		var cell1 = row.insertCell(0);
		cell1.innerHTML = days[i];
		moment.locale();
		console.log(moment(days[i], "MM-DD-YYYY"));
	}
	function removeRow(){
		table.innerHTML = "";
	}
}

document.addEventListener('DOMContentLoaded', function () {
  var modeSwitch = document.querySelector('.mode-switch');

  modeSwitch.addEventListener('click', function () {                     document.documentElement.classList.toggle('dark');
    modeSwitch.classList.toggle('active');
  });
  
  var listView = document.querySelector('.list-view');
  var gridView = document.querySelector('.grid-view');
  var projectsList = document.querySelector('.project-boxes');
  
  listView.addEventListener('click', function () {
    gridView.classList.remove('active');
    listView.classList.add('active');
    projectsList.classList.remove('jsGridView');
    projectsList.classList.add('jsListView');
  });
  
  gridView.addEventListener('click', function () {
    gridView.classList.add('active');
    listView.classList.remove('active');
    projectsList.classList.remove('jsListView');
    projectsList.classList.add('jsGridView');
  });
  
  document.querySelector('.messages-btn').addEventListener('click', function () {
    document.querySelector('.messages-section').classList.add('show');
  });
  
  document.querySelector('.messages-close').addEventListener('click', function() {
    document.querySelector('.messages-section').classList.remove('show');
  });
});

(function($) {
    $.fn.switchTabs = function() {
      $(this).each(function() {
        var el = $(this).children('.switch-tabs-nav'),
          switchBody = el.siblings('.switch-tabs-body');
  
        // Click switch tab
        switchBody.children('.switch-content:not(:first)').hide();
        el.on('click', 'a', function() {
          el.children().removeClass('active');
          $(this).parent().addClass('active');
          switchBody.children('.switch-content').hide();
  
          var activeTab = $(this).attr('href');
          $(activeTab).show();
          return false;
        });
  
        var totalWidth = 0;
        el.children().each(function() {
          var width = $(this).outerWidth();
          totalWidth += width;
        });
  
        $(window).resize(function() {
          var widthWrap = el.outerWidth();
          if (widthWrap <= totalWidth) {
            el.addClass('responsive');
          } else {
            el.removeClass('responsive');
          }
        }).trigger('resize');
      });
    }
  
    $(window).on('load', function() {
      $('.switch-tabs').switchTabs();
    });
  })(jQuery);
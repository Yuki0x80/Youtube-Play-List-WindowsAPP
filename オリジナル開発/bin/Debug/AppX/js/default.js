
var checkcount = 0;
var flag = 0;

var music = ["https://www.youtube.com/embed/watch?v=vawjZcjQ9Ng&list=PLUnzXnT1OYdH5DIv3mWiWeE2Zik4xlabS&autoplay=1&index=17", "https://www.youtube.com/embed/watch?v=7k-Bc00iL4w&list=FLcESOsSI_XCY6GRCEDKDyHQ&autoplay=1&index=6",
    "https://www.youtube.com/embed/watch?v=mnzQSsC9pJc&list=PLUnzXnT1OYdH5DIv3mWiWeE2Zik4xlabS&autoplay=1&index=9", "https://www.youtube.com/embed/watch?v=4KV46FYJI2US&autoplay=1&index=10&list=PLUnzXnT1OYdH5DIv3mWiWeE2Zik4xlabS",
    "https://www.youtube.com/embed/watch?v=vawjZcjQ9Ng&autoplay=1&index=16&list=PLUnzXnT1OYdH5DIv3mWiWeE2Zik4xlabS"];

var timestamp = [223, 131, 195, 232, 202];
//223,191,231,202
var timee = -2;

var timefin;

/*function aaa(i) {
    test.innerText = i + "番目";
    checkcount = i;
}*/

// 空白のテンプレートの概要については、次のドキュメントを参照してください:
// http://go.microsoft.com/fwlink/?LinkId=232509

(function () {
    "use strict";

    /* ----------------------
       ビデオプレイヤー
       ▼ ここから
   ---------------------- */

    function play() {

        var test = document.getElementById("test");
       
        var frame = document.getElementById('frame');
        var loadFlyout = document.getElementById('loadFlyout').winControl;
       
        
        var m1 = document.getElementById("m1");
        var m2 = document.getElementById("m2");
        var m3 = document.getElementById("m3");
        var m4 = document.getElementById("m4");
        var m5 = document.getElementById("m5");

        var other = document.getElementById("other");

       

        m1.innerText = "Better Left Alone";
        m2.innerText = "ます。";
        m3.innerText = "Maps - Sam Tsui";
        m4.innerText = "Good Time";
        m5.innerText = "Maps - Maddie Wilson";

      
       /* var i;
        test.innerText = i + "番目";
        var findUl = document.getElementById("menu-testlist"),
        findLi =findUl.children;
        test.innerText = findLi.length;
        for (i = 0; i < findLi.length; i++) {
            findLi[i].onclick = function () {
                test.innerText =i+"番目";
            }
        }
        */

        m1.onclick = function () {
            clearInterval(timefin);
            timee = -2;
            checkcount = 1;
            check(checkcount);
        }

        m2.onclick = function () {
            clearInterval(timefin);
            timee = -2;
            checkcount = 2;
            check(checkcount);
        }

        m3.onclick = function () {
            clearInterval(timefin);
            timee = -2;
            checkcount = 3;
            check(checkcount);
        }

        m4.onclick = function () {
            clearInterval(timefin);
            timee = -2;
            checkcount = 4;
            check(checkcount);
        }

        m5.onclick = function () {
            clearInterval(timefin);
            timee = -2;
            checkcount = 5;
            check(checkcount);
        }
        

        var left = document.getElementById("left");
        left.onclick = function () {
            checkcount = checkcount - 1;
            clearInterval(timefin);
            timee = -2;
            check(checkcount);
        }

        var light= document.getElementById("light");
        light.onclick = function () {
            checkcount = checkcount + 1;
            clearInterval(timefin);
            timee = -2;
            check(checkcount);
        }

        var other = document.getElementById("other");
        other.onclick = function () {
            if(flag==0){
                flag = 1;
                other.style.color = "#000";
            }else{
                flag = 0;
                other.style.color = "#FFF";
            }
        }
        
        function check(checkcount) {
            frame.src = music[checkcount-1];
            loadFlyout.show(frame, "top", "center");

            if (flag == 1) {
                    timefin = setInterval(function () {
                    timee++;
                  
                    if (timestamp[checkcount - 1] == timee) {
                        clearInterval(timefin);
                        timee = -2;
                        checkcount++;
                        if (music.length <= checkcount) {
                            checkcount = 1;
                        }
                        check(checkcount);
                    }
                    }, 1000);
            }
        }
        
    }
    /* ----------------------
        ビデオプレイヤー
        ▲ ここまで
    ---------------------- */

    WinJS.Binding.optimizeBindingReferences = true;
    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            args.setPromise(WinJS.UI.processAll().then(init));
        }
    };

    function init() {
        // ネットワークの処理
        var networkInfo = Windows.Networking.Connectivity.NetworkInformation;
        var internetProfile = networkInfo.getInternetConnectionProfile();
        if (internetProfile === null) {
            // オフラインの時の動作
            var msg = new Windows.UI.Popups.MessageDialog("インターネットに接続されていないので、アプリは利用できません。");
            msg.commands.append(new Windows.UI.Popups.UICommand("閉じる"));
            msg.showAsync();
        }

        // 画面のサイズが変わった時の動作
        var player = document.getElementById('player');
        var frame = document.getElementById('frame');
        var loadFlyout = document.getElementById('loadFlyout').winControl;
        window.onresize = function () {
            var pw = window.innerWidth - 40;

            if (pw < 800) {
                player.style.width = pw + "px";
                frame.style.width = pw + "px";
                frame.style.height = (pw / 16 * 9) + "px";
            }
            else {
                player.style.width = "auto";
                frame.style.width = "800px";
                frame.style.height = "450px";
            }
        }

        // 動画のロードが完了したときの動作
        frame.onload = function () {
            loadFlyout.hide();
        }

        
        play();
        movestart();

    }


    app.start();
})();


var xx = 1150;
function movestart() {
    document.onmousemove = function (e) {

        // InternetExplorer 用
        if (!e) e = window.event;

        // 出力テスト
       // document.getElementById("ugoki").textContent = "x座標" + e.clientX;
       // document.getElementById("ugoki1").textContent = "Y座標" + e.clientY;


        var new1 = document.getElementById("new1");
        new1.style.position = "absolute";
        new1.style.top = "80px";
        new1.style.left = "1380px";
        new1.style.borderRadius = "100%"
        new1.style.background = "#000";

        var new2 = document.getElementById("new2");
        new2.style.position = "absolute";
        new2.style.top = "220px";
        new2.style.left = "1380px";
        new2.style.borderRadius = "100%"
        new2.style.background = "#000";

        var new3 = document.getElementById("new3");
        new3.style.position = "absolute";
        new3.style.top = "360px";
        new3.style.left = "1380px";
        new3.style.borderRadius = "100%"
        new3.style.background = "#000";

        var new4 = document.getElementById("new4");
        new4.style.position = "absolute";
        new4.style.top="500px";
        new4.style.left = "1380px";
        new4.style.borderRadius="100%"
        new4.style.background="#000";

        if (e.clientX < 990) {
            xx = 1150;
        }
        if (e.clientX >= xx && e.clientX <= 1280 && e.clientY >= 0 && e.clientY <= 800) {
           // document.getElementById("ugoki").textContent = "範囲内";
           

            new1.style.transition = "0.40s";
            new1.style.background = "#575757";
            new1.style.width = "20px";
            new1.style.height = "90px";
            new1.style.top = "80px";
            new1.style.left = "1250px";
            new1.style.transform = "translate(-80px)";
           
            new2.style.transition = "0.40s";
            new2.style.background = "#575757";
            new2.style.width = "20px";
            new2.style.height = "90px";
            new2.style.top = "220px";
            new2.style.left = "1250px";
            new2.style.transform = "translate(-80px)";

            new3.style.transition = "0.40s";
            new3.style.background = "#575757";
            new3.style.width = "20px";
            new3.style.height = "90px";
            new3.style.top = "360px";
            new3.style.left = "1250px";
            new3.style.transform = "translate(-80px)";

            new4.style.transition="0.40s";
            new4.style.background="#575757";
            new4.style.width="20px";
            new4.style.height = "90px";
            new4.style.top = "500px";
            new4.style.left = "1250px";
            new4.style.transform = "translate(-80px)";

            if (e.clientX >= 1170 && e.clientX <= 1259 && e.clientY >= 81 && e.clientY <= 169) {
                xx = 991;
            } else if (e.clientX >= 1170 && e.clientX <= 1259 && e.clientY >= 220 && e.clientY <= 308) {
                xx = 991;
            } else if (e.clientX >= 1170 && e.clientX <= 1259 && e.clientY >= 359 && e.clientY <= 447) {
                xx = 991;
            } else if (e.clientX >= 1170 && e.clientX <= 1259 && e.clientY >= 498 && e.clientY <= 586) {
                xx = 991;
            } 
           
        }
    };
}


//ダメージ計算関数
function clickResultDisp(num){
    let poke1 = document.getElementById("form1");  //攻撃側ポケモン
    let poke2 = document.getElementById("form2");  //防御側ポケモン
    //わざのElement取得
    let moveid;
    //わざの隠しパラメータ
    let move_parameter;
    switch (num) {
        case 1:
            moveid = "move1";
            move_parameter = document.move1.parameter;
            break;
        case 2:
            moveid = "move2";
            move_parameter = document.move2.parameter;
            break;
        case 3:
            moveid = "move3";
            move_parameter = document.move3.parameter;
            break;
        default:
            break;
    }
    let move = document.getElementById(moveid);    //わざ
    let cat = move.getElementsByClassName("category")[0].value;   //分類
    var atk, def;
    if (cat == "1") {       //物理技なので攻撃と防御
        atk = poke1.getElementsByClassName("status")[1].innerHTML;
        def = poke2.getElementsByClassName("status")[2].innerHTML;
    }else{                  //特殊技なので特攻と特防
        atk = poke1.getElementsByClassName("status")[3].innerHTML;
        def = poke2.getElementsByClassName("status")[4].innerHTML;
    }
    atk = parseInt(atk); def = parseInt(def);
    //わざ、ポケモンのタイプ取得
    let move_type = move.getElementsByClassName("move-type");
    let poke1_type = poke1.getElementsByClassName("poke-type");
    let poke2_type = poke2.getElementsByClassName("poke-type");
    //一致補正
    let stab = 1.0;
    if (move_type[0].value==poke1_type[0].value || move_type[0].value==poke1_type[1].value){     
        stab = 1.5;
    }
    //タイプ相性
    let efc = TypeCompa(move_type[0].value, poke2_type[0].value, poke2_type[1].value);
    //基礎威力
    let pwr = move.getElementsByClassName("power")[0].value;  
    pwr = parseInt(pwr);
    
    //威力補正値
    let pwr_cor = 4096;
    //はりきりの都合上持ち物補正は上にしておきたい
    //攻撃側特性による補正
    switch (poke1.getElementsByClassName("ability")[0].value) {
        case "なし":
            break;
        case "アナライズ":
        case "そうだいしょう3":
            pwr_cor = Math.round(pwr_cor * 5325 / 4096);
            break;
        case "いわはこび":
            if (move_type[0].value == "13") {
                atk = Math.round(atk * 1.5);
            }
            break;
        case "かたいツメ":
            if (move_parameter[0].value == "1") {
                pwr_cor = Math.round(pwr_cor * 5325 /4096);
            }
            break;
        case "がんじょうあご":
            if (move_parameter[4].value == "1") {
                pwr_cor = Math.round(pwr_cor * 6144 / 4096);
            }
            break;
        case "きもったま":
            type_table[0][13] = 1.0;
            break;
        case "きれあじ":
            if (move_parameter[5].value == "1") {
                pwr_cor = Math.round(pwr_cor * 6144 / 4096);
            }
            break;
        case "クォークチャージ":
            if (poke1.getElementsByClassName("item")[0].value == "5" || document.getElementById("field").field.value == "electric"){
                let max_value = 0; let n;
                for (let i = 1; i < 6; i++) {
                    let value = parseInt(poke1.getElementsByClassName("status")[i].innerHTML);
                    if (max_value < value) {
                        max_value = value;            //最も大きい値とそれがなんなのか
                        n = i;
                    }
                }
                if ((cat=="1" && n==1) || (cat=="2" && n==3)) {
                    atk = Math.round(atk * 1.3);
                }
            }
            break;
        case "げきりゅう":
            if (move_type[0].value == "3") {
                atk = Math.round(atk * 1.5);
            }
            break;
        case "こだいかっせい":
            if (poke1.getElementsByClassName("item")[0].value == "5" || document.getElementById("weather").weather.value == "sunny"){
                let max_value = 0; let n;
                for (let i = 1; i < 6; i++) {
                    let value = parseInt(poke1.getElementsByClassName("status")[i].innerHTML);
                    if (max_value < value) {
                        max_value = value;            //最も大きい値とそれがなんなのか
                        n = i;
                    }
                }
                if ((cat=="1" && n==1) || (cat=="2" && n==3)) {
                    atk = Math.round(atk * 1.3);
                }
            }
            break;
        case "ごりむちゅう":
        case "こんじょう":
        case "はりきり":
            if (cat == "1") {
                atk = Math.floor(atk * 1.5); //はりきりは切り捨て
            }
            break;
        case "サンパワー":
            if (document.getElementById("weather").weather.value == "sunny" && cat == "2"){
                atk = Math.round(atk * 1.5);
            }
            break;
        case "しんりょく":
            if (move_type[0].value == "5") {
                atk = Math.round(atk * 1.5);
            }
            break;
        case "すてみ":
            if (move_parameter[3].value == "1") {
                pwr_cor = Math.round(pwr_cor * 4915 / 4096);
            }
            break;
        case "すなのちから":
            if (document.getElementById("weather").weather.value == "sandstorm") {
                if (move_type[0].value=="9" || move_type[0].value=="13" || move_type[0].value=="17") {
                    pwr_cor = Math.round(pwr_cor * 5325 / 4096);
                }
            }
            break;
        case "スロースタート":
            if (cat == "1") {
                atk = Math.round(atk / 2);
            }
            break;
        case "そうだいしょう1":
            pwr_cor = Math.round(pwr_cor * 4505 / 4096);
            break;
        case "そうだいしょう2":
            pwr_cor = Math.round(pwr_cor * 4915 / 4096);
            break;
        case "ちからもち":
        case "ヨガパワー":
            if (cat == "1") {
                atk = atk * 2;
            }
            break;
        case "てきおうりょく":
            if (stab == 1.5) {
                stab = 2.0;
            }
        case "テクニシャン":
            if (pwr < 61) {
                pwr_cor = Math.round(pwr_cor * 6144 / 4096);
            }
            break;
        case "てつのこぶし":
            if (move_parameter[2].value == "1") {
                pwr_cor = Math.round(pwr_cor * 4915 / 4096);
            }
            break;
        case "とうそうしん1":
            pwr_cor = Math.round(pwr_cor * 5120 / 4096);
            break;
        case "とうそうしん2":
            pwr_cor = Math.round(pwr_cor * 3072 / 4096);
            break;
        case "どくぼうそう":
            if (cat == "1") {
                pwr_cor = Math.round(pwr_cor * 6144 /4096);
            }
            break;
        case "ねつぼうそう":
            if (cat == "2") {
                pwr_cor = Math.round(pwr_cor * 6144 / 4096);
            }
            break;
        case "はがねのせいしん":
            if (move_type[0].value == "17") {
                pwr_cor = Math.round(pwr_cor * 6144 / 4096);
            }
            break;
        case "はりこみ":
            atk = atk * 2;
            break;
        case "パンクロック":
            if (move_parameter[1].value == "1") {
                pwr_cor = Math.round(pwr_cor * 5325 / 4096);
            }
            break;
        case "フェアリースキン":
            if (move_type[0].value == "1") {
                efc = TypeCompa("18", poke2_type[0].value, poke2_type[1].value);
                pwr_cor = Math.round(pwr_cor * 4915 / 4096);
                if ("18"==poke1_type[0].value || "18"==poke1_type[1].value){     
                    stab = 1.5;
                }
            }
            break;
        case "プラス":
        case "マイナス":
            if (cat == "2") {
                atk = Math.round(atk * 1.5);
            }
            break;
        case "フラワーギフト":
            if (document.getElementById("weather").weather.value == "sunny" && cat == "1"){
                atk = Math.round(atk * 1.5);
            }
            break;
        case "むしのしらせ":
            if (move_type[0].value == "12") {
                atk = Math.round(atk * 1.5);
            }
            break;
        case "メガランチャー":
            if (move_parameter[6].value == "1") {
                pwr_cor = Math.round(pwr_cor * 6144 / 4096);
            }
            break;
        case "もうか":
        case "もらいび":
            if (move_type[0].value == "2") {
                atk = Math.round(atk * 1.5);
            }
            break;
        case "わざわいのたま":
            if (cat == "2") {
                def = Math.round(def * 0.75);
            }
            break;
        case "わざわいのつるぎ":
            if (cat == "1") {
                def = Math.round(def * 0.75);
            }
            break;
        default:
            break;
    }

    //最終威力計算
    pwr = toInt(pwr *pwr_cor /4096);

    let result;
    result = Math.floor(22 * pwr * atk / def);
    result = Math.floor(result /50) +2;
    let min;
    min = Math.floor(0.85 * result);                       //最低乱数(乱数補正計算後は切り捨て)
    //一致補正(五捨五超入)
    result = toInt(result * stab);
    min = toInt(min * stab);
    //タイプ相性反映 　(てきおうりょくここでやりたい)
    result = Math.floor(result * efc);
    min = Math.floor(min * efc);
    move.getElementsByClassName("result")[0].innerHTML = String(min) + ' ~ ' + String(result);
}
//タイプ相性
function TypeCompa(movetype, poketype1, poketype2) {
    let moveid = parseInt(movetype) -1;
    let pokeid1 = parseInt(poketype1) -1;
    let effect = type_table[moveid][pokeid1];
    if (poketype2 != "0") {
        let pokeid2 = parseInt(poketype2) -1;
        effect = effect * type_table[moveid][pokeid2];
    }
    return effect;
}
//タイプ相性表
var type_table = [[1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5,0,1.0, 1.0, 0.5,1.0],       //ノーマル
                        [1.0, 0.5, 0.5, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 0.5, 1.0, 2.0, 1.0], //ほのお
                        [1.0, 2.0, 0.5, 1.0, 0.5, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 1.0, 1.0], //みず
                        [1.0, 1.0, 2.0, 0.5, 0.5, 1.0, 1.0, 1.0, 0,   2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0], //でんき
                        [1.0, 0.5, 2.0, 1.0, 0.5, 1.0, 1.0, 0.5, 2.0, 0.5, 1.0, 0.5, 2.0, 1.0, 0.5, 1.0, 0.5, 1.0], //くさ
                        [1.0, 0.5, 0.5, 1.0, 2.0, 0.5, 1.0, 1.0, 2.0, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0], //こおり
                        [2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 0.5, 0.5, 0.5, 2.0, 0,   1.0, 2.0, 2.0, 0.5], //かくとう
                        [1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 0.5, 0.5, 1.0, 1.0, 1.0, 0.5, 0.5, 1.0, 1.0, 0,   2.0], //どく
                        [1.0, 2.0, 1.0, 2.0, 0.5, 1.0, 1.0, 2.0, 1.0, 0,   1.0, 0.5, 2.0, 1.0, 1.0, 1.0, 2.0, 1.0], //じめん
                        [1.0, 1.0, 1.0, 0.5, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 1.0, 1.0, 0.5, 1.0], //ひこう
                        [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 0,   0.5, 1.0], //エスパー
                        [1.0, 0.5, 1.0, 1.0, 2.0, 1.0, 0.5, 0.5, 1.0, 0.5, 2.0, 1.0, 1.0, 0.5, 1.0, 2.0, 0.5, 0.5], //むし
                        [1.0, 2.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 0.5, 2.0, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0], //いわ
                        [0,   1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 1.0], //ゴースト
                        [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 0.5, 0], //ドラゴン
                        [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 2.0, 1.0, 0.5, 1.0, 0.5], //あく
                        [1.0, 0.5, 0.5, 0.5, 1.0, 2.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 1.0, 1.0, 1.0, 0.5, 2.0], //はがね
                        [1.0, 0.5, 1.0, 1.0, 1.0, 1.0, 2.0, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 0.5, 1.0]]; //フェアリー

function toInt(num){      //五捨五超入
    let a = Math.floor(num);
    let b = a + 0.5;
    if (num > b){
        return a+1;
    }else{
        return a;
    }
}



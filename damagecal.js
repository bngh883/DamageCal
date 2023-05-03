//ダメージ計算関数
function clickResultDisp(num, detail){
    //環境
    let style_value = document.getElementById("battlestyle").battlestyle.value;  //シングルかダブル
    let weather_value = document.getElementById("weather").weather.value;        //天候
    let field_value = document.getElementById("field").field.value;              //フィールド
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
    let move_name = move.getElementsByClassName("move-name")[0].value; // わざ名
    let cat = move.getElementsByClassName("category")[0].value;   //分類
    var atk, def;
    if (cat == "1") {       //物理技なので攻撃と防御
        atk = poke1.getElementsByClassName("status")[1].innerHTML;
        def = poke2.getElementsByClassName("status")[2].innerHTML;
    }else{                  //特殊技なので特攻と特防
        atk = poke1.getElementsByClassName("status")[3].innerHTML;
        def = poke2.getElementsByClassName("status")[4].innerHTML;
    }
    //サイコショック、サイコブレイク
    if (move_name == "サイコショック" || move_name == "サイコブレイク") {
        def = poke2.getElementsByClassName("status")[2].innerHTML;
    }
    //イカサマ
    if (move_name == "イカサマ") {
        atk = poke2.getElementsByClassName("status")[1].innerHTML;
    }
    atk = parseInt(atk); def = parseInt(def);
    //わざ、ポケモンのタイプ取得
    let move_type = move.getElementsByClassName("move-type")[0].value;
    let poke1_type1, poke1_type2, poke2_type1, poke2_type2, poke1_terastal, poke2_terastal;
    let poke1_type = poke1.getElementsByClassName("poke-type");
    poke1_type1 = poke1_type[0].value;
    poke1_type2 = poke1_type[1].value;
    poke1_terastal = poke1.getElementsByClassName("terastal")[0].value;
    let poke2_type = poke2.getElementsByClassName("poke-type");
    
    poke2_terastal = poke2.getElementsByClassName("terastal")[0].value;
    //攻撃側テラスタルと一致補正の処理
    let stab = 1.0;
    if (move_type==poke1_type1 || move_type==poke1_type2 || move_type==poke1_terastal){     
        stab = 1.5;
        if (poke1_type1==poke1_terastal || (poke1_type2==poke1_terastal && poke1_type2!="0")) {
            stab = 2.0;
        }
    }
    //防御側テラスタル
    if (poke2_terastal == "0") {
        poke2_type1 = poke2_type[0].value;
        poke2_type2 = poke2_type[1].value;
    } else {
        poke2_type1 = poke2_terastal;
        poke2_type2 = "0";
    }

    let poke1_landed = 1; let poke2_landed = 1;           //接地しているか
    if (poke1_type1 == "10" || poke1_type2 == "10") {
        poke1_landed = 0;
    }
    if (poke2_type1 == "10" || poke2_type2 == "10") {
        poke2_landed = 0;
    }
    //タイプ相性
    let efc = TypeCompa(move_type, poke2_type1, poke2_type2);
    //フライングプレス
    if (move_name == "フライングプレス") {
        efc = efc * TypeCompa("10", poke2_type1, poke2_type2);
    }
    //うちおとす状態
    if (document.getElementById("SmackDown").checked) {
        poke2_landed = 1;
        if (move_type == "9"){    // わざがじめんタイプ
            if (poke2_type1 == "10") {                 //防御側が飛行タイプ
                if (poke2_type2 == "0" || poke2_type2 == "10") {
                    efc = 1.0;
                }else {
                    efc = TypeCompa("9", poke2_type2, "0");
                }
            }else if (poke2_type2 =="10"){
                efc = TypeCompa("9", poke2_type1, "0");
            }
        }
    }
    
    //やけど
    let burn = 0;
    if (document.getElementById("Burned").checked) {
        burn = 1;
    }
    
    //基礎威力
    let pwr = move.getElementsByClassName("power")[0].value;  
    pwr = parseInt(pwr);
    
    let M = 4096;             //例外補正値 M
    let pwr_cor = 4096;       //威力補正値
    let atk_cor = 4096;       //攻撃補正値
    let def_cor = 4096;       //防御補正値
    //サブ環境
    //じゅうりょく
    if (document.getElementById("Gravity").checked) {
        poke1_landed = 1;
        poke2_landed = 1;
        if (move_type == "9"){    // わざがじめんタイプ
            if (poke2_type1 == "10") {                 //防御側が飛行タイプ
                if (poke2_type2 == "0" || poke2_type2 == "10") {
                    efc = 1.0;
                }else {
                    efc = TypeCompa("9", poke2_type2, "0");
                }
            }else if (poke2_type2 =="10"){
                efc = TypeCompa("9", poke2_type1, "0");
            }
        }
        if (move_name == "Gのちから") {
            pwr_cor = Math.round(pwr_cor * 1.5);
        }
    }
    //わざわい
    if (document.getElementById("Vessel").checked && cat == "2") {
        pwr_cor = Math.round(pwr_cor * 0.75);
    }
    if (document.getElementById("Tablets").checked && cat == "1") {
        pwr_cor = Math.round(pwr_cor * 0.75);
    }
    if (document.getElementById("Beads").checked && cat == "2") {
        def_cor = Math.round(def_cor * 0.75);
    }
    if (document.getElementById("Sword").checked && cat == "1") {
        def_cor = Math.round(def_cor * 0.75);
    }
    //壁補正
    if ((document.getElementById("Reflect").checked && cat == "1") || 
               (document.getElementById("LightScreen").checked && cat == "2" )) {
        if (style_value == "single") {
            M = Math.round(M / 2);
        }else{
            M = Math.round(M * 2732 / 4096);
        }
    }
    //パワースポット補正
    if (document.getElementById("PowerSpot").checked) {
        pwr_cor = Math.round(pwr_cor * 5325 / 4096);
    }
    //攻撃側特性による補正
    switch (poke1.getElementsByClassName("ability")[0].value) {
        case "なし":
            break;
        case "アナライズ":
        case "そうだいしょう3":
            pwr_cor = Math.round(pwr_cor * 5325 / 4096);
            break;
        case "いろめがね":
            if (efc < 0.6) {
                M = Math.round(M * 2);
            }
            break;
        case "いわはこび":
            if (move_type == "13") {
                atk_cor = Math.round(atk_cor * 6144 / 4096);
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
            if (move_type == "1") {        //わざがノーマル
                if (poke2_type1 == "14") {  //タイプ1がゴースト
                    efc = TypeCompa("1", "1", poke2_type2);     //ゴーストの部分をノーマルに置き換えて計算
                }else if (poke2_type2 == "14") { //タイプ2がゴースト
                    efc = TypeCompa("1", poke2_type1, "0");     //単タイプとして計算
                }
            }
            break;
        case "きれあじ":
            if (move_parameter[5].value == "1") {
                pwr_cor = Math.round(pwr_cor * 6144 / 4096);
            }
            break;
        case "クォークチャージ":
            if (poke1.getElementsByClassName("item")[0].value == "5" || field_value == "electric"){
                let max_value = 0; let n;
                for (let i = 1; i < 6; i++) {
                    let value = parseInt(poke1.getElementsByClassName("status")[i].innerHTML);
                    if (max_value < value) {
                        max_value = value;            //最も大きい値とそれがなんなのか
                        n = i;
                    }
                }
                if ((cat=="1" && n==1) || (cat=="2" && n==3)) {
                    atk_cor = Math.round(atk_cor * 5325 / 4096);
                }
            }
            break;
        case "げきりゅう":
            if (move_type == "3") {
                atk_cor = Math.round(atk_cor * 6144 / 4096);
            }
            break;
        case "こだいかっせい":
            if (poke1.getElementsByClassName("item")[0].value == "5" || weather_value == "sunny"){
                let max_value = 0; let n;
                for (let i = 1; i < 6; i++) {
                    let value = parseInt(poke1.getElementsByClassName("status")[i].innerHTML);
                    if (max_value < value) {
                        max_value = value;            //最も大きい値とそれがなんなのか
                        n = i;
                    }
                }
                if ((cat=="1" && n==1) || (cat=="2" && n==3)) {
                    atk_cor = Math.round(atk_cor * 5325 / 4096);
                }
            }
            break;
        case "ごりむちゅう":
        case "こんじょう":
            if (burn == 1 && cat == "1") {
                atk = Math.round(atk * 6144 / 4096); 
                burn = 0;   //やけど効果無視
            }
            break;
        case "はりきり":
            if (cat == "1") {
                atk = Math.floor(atk * 1.5); //はりきりは切り捨て、攻撃に先にかける
            }
            break;
        case "サンパワー":
            if (weather_value == "sunny" && cat == "2"){
                atk_cor = Math.round(atk_cor * 6144 / 4096);
            }
            break;
        case "しんりょく":
            if (move_type == "5") {
                atk_cor = Math.round(atk_cor * 6144 / 4096);
            }
            break;
        case "すてみ":
            if (move_parameter[3].value == "1") {
                pwr_cor = Math.round(pwr_cor * 4915 / 4096);
            }
            break;
        case "すなのちから":
            if (weather_value == "sandstorm") {
                if (move_type=="9" || move_type=="13" || move_type=="17") {
                    pwr_cor = Math.round(pwr_cor * 5325 / 4096);
                }
            }
            break;
        case "スロースタート":
            if (cat == "1") {
                atk_cor = Math.round(atk_cor * 2048 / 4096);
            }
            break;
        case "そうだいしょう1":
            pwr_cor = Math.round(pwr_cor * 4505 / 4096);
            break;
        case "そうだいしょう2":
            pwr_cor = Math.round(pwr_cor * 4915 / 4096);
            break;
        case "ちからずく":
            if (move_parameter[8].value == "1") {
                pwr_cor = Math.round(pwr_cor * 5325 / 4096);
            }
            break;
        case "ちからもち":
        case "ヨガパワー":
            if (cat == "1") {
                atk_cor = Math.round(atk_cor * 2);
            }
            break;
        case "てきおうりょく":
            if (stab == 1.5) {
                stab = 2.0;
            } else if (stab == 2.0){
                stab = 2.25;             //テラスタル＋適応力
            }
            break;
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
            if (burn == 1 && cat == "2") {
                pwr_cor = Math.round(pwr_cor * 6144 / 4096);
            }
            break;
        case "はがねのせいしん":
            if (move_type == "17") {
                pwr_cor = Math.round(pwr_cor * 6144 / 4096);
            }
            break;
        case "ハドロンエンジン":
            if (field_value == "electric" && cat == "2") {
                pwr_cor = Math.round(pwr_cor * 5461 / 4096);
            }
            break;
        case "はりこみ":
            atk_cor = Math.round(atk_cor * 2);
            break;
        case "パンクロック":
            if (move_parameter[1].value == "1") {
                pwr_cor = Math.round(pwr_cor * 5325 / 4096);
            }
            break;
        case "ひひいろのこどう":
            if (weather_value == "sunny" && cat == "1") {
                pwr_cor = Math.round(pwr_cor * 5461 / 4096);
            }
            break;
        case "フェアリースキン":
            if (move_type == "1") {
                efc = TypeCompa("18", poke2_type1, poke2_type2);
                pwr_cor = Math.round(pwr_cor * 4915 / 4096);
                if ("18"==poke1_type1 || "18"==poke1_type2){     
                    stab = 1.5;
                }
            }
            break;
        case "プラス":
        case "マイナス":
            if (cat == "2") {
                atk_cor = Math.round(atk_cor * 6144 /4096);
            }
            break;
        case "フラワーギフト":
            if (weather_value == "sunny" && cat == "1"){
                atk_cor = Math.round(atk_cor * 6144 / 4096);
            }
            break;
        case "むしのしらせ":
            if (move_type == "12") {
                atk_cor = Math.round(atk_cor * 6144 / 4096);
            }
            break;
        case "メガランチャー":
            if (move_parameter[6].value == "1") {
                pwr_cor = Math.round(pwr_cor * 6144 / 4096);
            }
            break;
        case "もうか":
        case "もらいび":
            if (move_type == "2") {
                atk_cor = Math.round(atk_cor * 6144 / 4096);
            }
            break;
        case "わざわいのたま":
            if (cat == "2") {
                def_cor = Math.round(def_cor * 3072 / 4096);
            }
            break;
        case "わざわいのつるぎ":
            if (cat == "1") {
                def_cor = Math.round(def_cor * 3072 / 4096);
            }
            break;
        default:
            break;
    }
    //味方によるはがねのせいしん補正
    if (document.getElementById("SteelySpirit").checked && move_type =="17") {
        pwr_cor = Math.round(pwr_cor * 6144 / 4096);
    }
    //防御側特性による補正
    switch (poke2.getElementsByClassName("ability")[0].value) {
        case "なし":
            break;
        case "あついしぼう":
            if (move_type == "2" || move_type == "6") {
                atk_cor = Math.round(atk_cor * 2048/ 4096);
            }
            break;
        case "かんそうはだ":
            if (move_type == "2") {
                pwr_cor = Math.round(pwr_cor * 5120 / 4096);
            }else if (move_type == "3"){
                efc = 0;
            }
            break;
        case "きよめのしお":
            if (move_type == "14") {
                atk_cor = Math.round(atk_cor * 2048 / 4096);
            }
            break;
        case "くさのけがわ":
            if (field_value == "glass" && cat == "1") {
                def_cor = Math.round(def_cor * 1.5);
            }
            break;
        case "クォークチャージ":
            if (poke2.getElementsByClassName("item")[0].value == "3" || field_value == "electric"){
                let max_value = 0; let n;
                for (let i = 1; i < 6; i++) {
                    let value = parseInt(poke1.getElementsByClassName("status")[i].innerHTML);
                    if (max_value < value) {
                        max_value = value;            //最も大きい値とそれがなんなのか
                        n = i;
                    }
                }
                if ((cat=="1" && n==2) || (cat=="2" && n==4)) {
                    def_cor = Math.round(def_cor * 5325 / 4096);
                }
            }
            break;
        case "こおりのりんぷん":
            if (cat == "2") {
                M = Math.round(M * 2048 / 4096);
            }
            break;
        case "こだいかっせい":
            if (poke2.getElementsByClassName("item")[0].value == "3" || weather_value == "sunny"){
                let max_value = 0; let n;
                for (let i = 1; i < 6; i++) {
                    let value = parseInt(poke1.getElementsByClassName("status")[i].innerHTML);
                    if (max_value < value) {
                        max_value = value;            //最も大きい値とそれがなんなのか
                        n = i;
                    }
                }
                if ((cat=="1" && n==2) || (cat=="2" && n==4)) {
                    def_cor = Math.round(def_cor * 5325 / 4096);
                }
            }
            break;
        case "たいねつ":
            if (move_type == "2") {
                pwr_cor = Math.round(pwr_cor * 2048 / 4096);
            }
            break;
        case "ハードロック":
        case "フィルター":
            if (efc > 1.9) {
                M = Math.round(M * 3072 / 4096);
            }
            break;
        case "ファーコート":
            if (cat == "1") {
                def_cor = Math.round(def_cor * 2);
            }
            break;
        case "ふしぎなうろこ":
            if (cat == "1") {
                def_cor = Math.round(def_cor * 1.5);
            }
            break;
        case "ふゆう":
            if (!(document.getElementById("SmackDown").checked || document.getElementById("Gravity").checked)) {
                poke2_landed = 0;
                if (move_type == "9") {
                    efc = 0;
                }
            }
            break;
        case "マルチスケイル":
            M = Math.round(M * 2048 / 4096);
            break;
        case "もふもふ":
            if (move_type == "2") {
                M = Math.round(M * 2);
            }
            if (move_parameter[0].value == "1") {
                M = Math.round(M * 2048 / 4096);
            }
            break;
        default:
            break;
    }
    //フレンドガード補正
    if (document.getElementById("FriendGuard").checked) {
        M = Math.round(M * 3072 / 4096);
    }
    //攻撃側持ち物補正
    switch (poke1.getElementsByClassName("item")[0].value) {
        case "0": //なし
            break;
        case "1": //プレート系
            pwr_cor = Math.round(pwr_cor * 4915 / 4096);
            break;
        case "2": //いのちのたま
            M = Math.round(M * 5324 /4096);
            break;
        case "3": //こだわりハチマキ
            if (cat == "1") {
                atk_cor = Math.round(atk_cor * 6144 / 4096);
            }
            break;
        case "4": //こだわりメガネ
            if (cat == "2") {
                atk_cor = Math.round(atk_cor * 6144 / 4096);
            }
            break;
        case "6": //達人の帯
            if (efc > 1.9) {
                M = Math.round(M * 4915 / 4096);
            }
            break;
        case "7": //ちからのハチマキ
            if (cat == "1") {
                pwr_cor = Math.round(pwr_cor * 4505 / 4096);
            }
            break;
        case "8": //ものしりメガネ
            if (cat == "2") {
                pwr_cor = Math.round(pwr_cor * 4505 / 4096);
            }
            break;
        case "9": //ノーマルジュエル
            if (move_type == "1") {
                pwr_cor = Math.round(pwr_cor * 5325 / 4096);
            }
            break;
        default:
            break;
    }
    //防御側持ち物補正
    switch (poke2.getElementsByClassName("item")[0].value) {
        case "0": //なし
            break;
        case "1": //半減きのみ
            if (efc > 1.9) {
                M = Math.round(M * 2048 / 4096);
            }
            break;
        case "2": //チョッキ
            if (cat == "2") {
                def_cor = Math.round(def_cor * 1.5);
            }
            break;
        case "4": //ふうせん
            if (!(document.getElementById("SmackDown").checked || document.getElementById("Gravity").checked)) {
                poke2_landed = 0;
                if (move_type == "9") {
                    efc = 0;
                }
            }
            break;
        case "5": //しんかのきせき
            def_cor = Math.round(def_cor * 1.5);
        default:
            break;
    }
    //てだすけ補正
    if (document.getElementById("HelpingHand").checked) {
        pwr_cor = Math.round(pwr_cor * 6144 / 4096);
    }
    //じゅうでん補正
    if (document.getElementById("Charge").checked && move_type =="4") {
        pwr_cor = Math.round(pwr_cor * 2);
    }
    //砂＋いわタイプ、雪＋こおりタイプ補正（切り捨て）
    switch (weather_value) {
        case "sandstorm":
            if (cat == "2") {
                if (poke2_terastal = "13"){
                    def = Math.floor(def * 1.5);
                }
                else if ("13" in poke2_type){
                    def = Math.floor(def * 1.5);
                }
            }
            break;
        case "snow":
            if (cat == "1") {
                if (poke2_terastal = "6"){
                    def = Math.floor(def * 1.5);
                }
                else if ("6" in poke2_type){
                    def = Math.floor(def * 1.5);
                }
            }
            break;
        default:
            break;
    }
    //フィールド補正
    switch (field_value) {
        case "normal2":
            break;
        case "electric":
            if (move_type == "4" && poke1_landed == 1) {
                pwr_cor = Math.round(pwr_cor * 5325 / 4096);
            }
            break;
        case "psychic":
            if (move_name == "ワイドフォース") {
                move_parameter[7].value = "2";
                pwr_cor = Math.floor(pwr_cor * 6144 / 4096);
            }
            if (move_type == "11" && poke1_landed == 1) {
                pwr_cor = Math.round(pwr_cor * 5325 / 4096);
            }
            break;
        case "glass":
            if (move_type == "5" && poke1_landed == 1) {
                pwr_cor = Math.round(pwr_cor * 5325 / 4096);
            } else if (poke2_landed == 1 && (move_name=="じしん" || move_name=="じならし" || move_name=="マグニチュード")) {
                pwr_cor = Math.round(pwr_cor / 2);
            }
            break;
        case "misty":
            if (move_type == "15" && poke2_landed == 1) {
                pwr_cor = Math.round(pwr_cor / 2);
            }
            break;
        default:
            break;
    }
    //フリーズドライ
    if (move_name == "フリーズドライ") {
        if (poke2_type1 == "3" || poke2_type2 == "3") {
            efc = efc * 4;
        }
    }
    //アクセルブレイク、イナズマドライブ
    if (move_name == "アクセルブレイク" || move_name == "イナズマドライブ") {
        if (efc > 1.9) {
            M = Math.round(M * 5461 / 4096);
        }
    }

    pwr = toInt(pwr * pwr_cor / 4096);   //最終威力計算（五捨五超入）
    atk = toInt(atk * atk_cor / 4096);   //最終攻撃計算
    def = toInt(def * def_cor / 4096);   //最終防御計算

    let result;                                   //最大乱数の結果
    result = Math.floor(22 * pwr * atk / def);
    result = Math.floor(result /50) +2;
    //範囲補正　（五捨五超入）
    if (style_value == "double") {
        if (move_parameter[7].value == "2") { //複数範囲
            result = toInt(result * 0.75);
        }
    }
    //天候補正　（五捨五超入）
    switch (weather_value) {
        case "sunny":
            if (move_type == "2") {
                result = toInt(result * 1.5);
            }else if (move_type == "3") {
                result = toInt(result / 2);
            }
            break;
        case "rain":
            if (move_type == "3") {
                result = toInt(result * 1.5);
            }else if (move_type == "2") {
                result = toInt(result / 2);
            }
            break;
        default:
            break;
    }
    //詳細表示設定の確認
    if (detail == 1) {
        //防御側HP取得
        let defHP = poke2.getElementsByClassName("status")[0].innerHTML;
        defHP = parseInt(defHP);
        let move_detail = document.getElementById("detail");
        let normals = move_detail.getElementsByClassName("normal");
        let criticals = move_detail.getElementsByClassName("critical");
        for (let i = 0; i < 16; i++) {
            let result_detail = result;
            let result_critical = toInt(result * 1.5); //急所補正
            //乱数補正（切り捨て）
            let rand = (85 + i) / 100;
            result_detail = Math.floor(result_detail * rand);
            result_critical = Math.floor(result_critical * rand);
            //一致補正(五捨五超入)
            result_detail = toInt(result_detail * stab);
            result_critical = toInt(result_critical * stab);
            //タイプ相性反映(切り捨て)
            result_detail = Math.floor(result_detail * efc);
            result_critical = Math.floor(result_critical * efc);
            //やけど補正（五捨五超入）
            if (burn == 1 && cat=="1") {
                result_detail = toInt(result_detail / 2);
                result_critical = toInt(result_critical / 2);
            }
            //補正値:Mの計算(五捨五超入)
            result_detail = toInt(result_detail * M / 4096);
            result_critical = toInt(result_critical * M / 4096);
            normals[i].innerHTML = result_detail;
            criticals[i].innerHTML = result_critical;
            //　2発未満が青、1発以上が赤
            if (defHP <= result_detail) {
                normals[i].style.color = '#ff0000';
            }else if (defHP <= result_detail*2) {
                normals[i].style.color = '#000000';
            }else{
                normals[i].style.color = '#0000ff';
            }
            if (defHP < result_critical) {
                criticals[i].style.color = '#ff0000';
            }else if (defHP < result_critical*2) {
                criticals[i].style.color = '#000000';
            }else{
                criticals[i].style.color = '#0000ff';
            }
        }
        document.getElementById("detail").getElementsByTagName("h3")[0].innerHTML = "詳細結果：わざ"+String(num);
    }
    //最低乱数(乱数補正計算後は切り捨て)
    let min;
    min = Math.floor(0.85 * result);         
    //一致補正(五捨五超入)
    result = toInt(result * stab);
    min = toInt(min * stab);
    //タイプ相性反映(切り捨て)
    result = Math.floor(result * efc);
    min = Math.floor(min * efc);
    //やけど補正（五捨五超入）
    if (burn == 1 && cat=="1") {
        result = toInt(result / 2);
        min = toInt(min / 2);
    }
    //補正値:Mの計算(五捨五超入)
    result = toInt(result * M / 4096);
    min = toInt(min * M / 4096);
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

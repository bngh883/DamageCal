function SearchPokemon(pokeID){
    let req = new XMLHttpRequest();  //HTTPでファイルを読み込む
    req.open("GET", "./PokemonDataBase/PokemonData.csv", false);    //ファイル取得

    try {
        req.send(null);
      } catch (err) {
        document.getElementById("result").innerHTML = "致命的なエラー";
      }
    
    //ポケモンのデータリスト取得
    let lines = req.responseText.split("\n");

    if (pokeID == 1) {
        var poke = document.getElementById("form1"); //ポケモン1
    }else{
        var poke = document.getElementById("form2"); //ポケモン2
    }
    //ポケモン名取得
    let name = poke.getElementsByClassName("poke-name")[0].value;
    //個体値取得
    let IVs = poke.getElementsByClassName("IV");
    //努力値取得
    let EVs = poke.getElementsByClassName("EV");
    //性格補正取得
    let nature = poke.getElementsByClassName("nature")[0].value;
    let nature_appList = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
    nature = parseInt(nature);
    switch (nature % 10) {
        case 1: // A上昇
            nature_appList[1] = 1.1;
            break;
        case 2: // B上昇
            nature_appList[2] = 1.1;
            break;
        case 3: // C上昇
            nature_appList[3] = 1.1;
            break;
        case 4: // D上昇
            nature_appList[4] = 1.1;
            break;
        case 5: // S上昇
            nature_appList[5] = 1.1;
            break;
        default:
            break;
    }
    if (nature < 10) {           // A下降
        nature_appList[1] = 0.9;
    }else if (nature < 20) {     // B下降    
        nature_appList[2] = 0.9;
    }else if (nature < 30) {     // C下降    
        nature_appList[3] = 0.9;
    }else if (nature < 40) {     // D下降    
        nature_appList[4] = 0.9;
    }else if (nature < 50) {     // S下降    
        nature_appList[5] = 0.9;
    }
    //ランク補正取得
    let ranks = poke.getElementsByClassName("rank");
    let rank_appList = [1.0, 1.0, 1.0, 1.0, 1.0];
    for (let i = 0; i < 5; i++) {
        switch (parseInt(ranks[i].value)) {
            case 6:
                rank_appList[i] = 4.0;
                break;
            case 5:
                rank_appList[i] = 3.5;
                break;
            case 4:
                rank_appList[i] = 3.0;
                break;
            case 3:
                rank_appList[i] = 2.5;
                break;
            case 2:
                rank_appList[i] = 2.0;
                break;
            case 1:
                rank_appList[i] = 1.5;
                break;
            case -1:
                rank_appList[i] = 2/3;
                break;
            case -2:
                rank_appList[i] = 0.5;
                break;
            case -3:
                rank_appList[i] = 0.4;
                break;
            case -4:
                rank_appList[i] = 1/3;
                break;
            case -5:
                rank_appList[i] = 2/7;
                break;
            case -6:
                rank_appList[i] = 0.25;
                break;
            default:
                break;
        }
    }

    //ポケモンをcsvから検索しあれば実数値計算
    for (let i=0; i < lines.length; i++){
        let cells = lines[i].split(",");

        if(cells[0] == name){
            for (let j=0; j<6; j++){
                let stats_v = parseInt(cells[j+1]); //種族値
                let IV_v = parseInt(IVs[j].value);  //個体値
                let EV_v = parseInt(EVs[j].value);  //努力値
                let result = stats_v + IV_v/2 + EV_v/8;
                if (j == 0){                        //　HP
                    result = parseInt(result +60);
                }else{                              //　それ以外
                    result = parseInt(result +5);
                    result = parseInt(result * nature_appList[j]);   //性格補正
                    result = parseInt(result * rank_appList[j-1]);   //ランク補正
                }
                poke.getElementsByClassName("status")[j].innerHTML = result;
            }
            return;
        }
    }
}
function MoveSearch(){
    let req = new XMLHttpRequest();  //HTTPでファイルを読み込む
    req.open("GET", "./PokemonDataBase/MoveData.csv", false);    //ファイル取得

    try {
        req.send(null);
      } catch (err) {
        document.getElementById("result").innerHTML = "致命的なエラー";
      }
    
    //わざデータリスト取得
    let lines = req.responseText.split("\n");
    //わざのElement取得
    let move = document.getElementById("move");
    //わざ名取得
    let name = move.getElementsByClassName("move-name")[0].value;

    //わざをcsvから検索しあればデータ取得
    for (let i = 1; i < lines.length; i++) {
        let cells = lines[i].split(",");
        
        if(cells[0] == name){
            move.getElementsByClassName("move-type")[0].value = cells[1];    //分類
            move.getElementsByClassName("category")[0].value = cells[2];    //分類
            move.getElementsByClassName("power")[0].value = cells[3];       //いりょく
            return;
        }
    }
    
}

//ポケモン1用関数
function Buppa(num){
    document.getElementById("form1").getElementsByClassName("EV")[num].value = 252;
    EVsum();
}
function Mufuri(num){
    document.getElementById("form1").getElementsByClassName("EV")[num].value = 0;
    EVsum();
}
function EVsum(){
    let sum = 0;
    //努力値取得
    let EVs = document.getElementById("form1").getElementsByClassName("EV");
    for (let i = 0; i < 6; i++) {
        sum += parseInt(EVs[i].value);
    }
    document.getElementById("form1").getElementsByClassName("EV-total")[0].innerHTML ="残:"+ String(508 - sum);
}

//ポケモン2用関数
function Buppa2(num){
    document.getElementById("form2").getElementsByClassName("EV")[num].value = 252;
    EVsum2();
}
function Mufuri2(num){
    document.getElementById("form2").getElementsByClassName("EV")[num].value = 0;
    EVsum2();
}
function EVsum2(){
    let sum = 0;
    //努力値取得
    let EVs = document.getElementById("form2").getElementsByClassName("EV");
    for (let i = 0; i < 6; i++) {
        sum += parseInt(EVs[i].value);
    }
    document.getElementById("form2").getElementsByClassName("EV-total")[0].innerHTML ="残:"+ String(508 - sum);
}

//ダメージ計算関数
function clickResultDisp(){
    var atk = document.getElementById("form1").getElementsByClassName("status")[1].innerHTML;
    var def = document.getElementById("form2").getElementsByClassName("status")[2].innerHTML;
    var pwr = document.getElementById("power").value;
    var efc = document.getElementById("effect").value;
    atk = parseInt(atk); def = parseInt(def); pwr = parseInt(pwr); efc = parseInt(efc);
    var result;
    result = Math.floor(22 * pwr * atk / def);
    result = Math.floor(result /50) +2;
    var min;
    min = toInt(0.85 * result);                       //最低乱数
    if (document.getElementById("STAB").checked){     //一致補正
        result = toInt(result * 1.5);
        min = toInt(min * 1.5);
    }
    result = toInt(result * efc);
    min = toInt(min * efc);
    document.getElementById("result").innerHTML = String(min) + ' ~ ' + String(result);
}

function toInt(num){      //五捨五超入
    let a = Math.floor(num);
    let b = a + 0.5;
    if (num > b){
        return a+1;
    }else{
        return a;
    }
}



//ポケモン検索してベース実数地取得
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

    //ポケモンをcsvから検索しあれば実数値計算
    for (let i=0; i < lines.length; i++){
        let cells = lines[i].split(",");

        if(cells[0] == name){
            //タイプ取得
            let type = poke.getElementsByClassName("poke-type");
            type[0].value = cells[7];
            type[1].value = cells[8];
            for (let j=0; j<6; j++){
                let result = parseInt(cells[j+1]); //種族値
                poke.getElementsByClassName("base")[j].innerHTML = result;
            }
            break;
        }
    }
    CalcStat(pokeID);
}
//実数値計算
function CalcStat(pokeID) {
    if (pokeID == 1) {
        var poke = document.getElementById("form1"); //ポケモン1
    }else{
        var poke = document.getElementById("form2"); //ポケモン2
    }
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
    //ベース実数値取得
    let stats = poke.getElementsByClassName("base");
    for (let j=0; j<6; j++){
        let stats_v = parseInt(stats[j].innerHTML); //種族値
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
//わざ検索
function MoveSearch(num){
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
    let moveid;
    //わざの隠しパラメータ
    let parameter;
    switch (num) {
        case 1:
            moveid = "move1";
            parameter = document.move1.parameter;
            break;
        case 2:
            moveid = "move2";
            parameter = document.move2.parameter;
            break;
        case 3:
            moveid = "move3";
            parameter = document.move3.parameter;
            break;
        default:
            break;
    }
    let move = document.getElementById(moveid);    //わざ
    //わざ名取得
    let name = move.getElementsByClassName("move-name")[0].value;
    
    //わざをcsvから検索しあればデータ取得
    for (let i = 1; i < lines.length; i++) {
        let cells = lines[i].split(",");
        
        if(cells[0] == name){
            move.getElementsByClassName("move-type")[0].value = cells[1];    //タイプ
            move.getElementsByClassName("category")[0].value = cells[2];    //分類
            move.getElementsByClassName("power")[0].value = cells[3];       //いりょく
            parameter[0].value = cells[5]; //直接
            parameter[1].value = cells[8]; //音技
            parameter[2].value = cells[9]; //パンチ
            parameter[3].value = cells[10]; //すてみ
            parameter[4].value = cells[11]; //かみつき
            parameter[5].value = cells[12]; //斬撃
            parameter[6].value = cells[13]; //波動
            parameter[7].value = cells[7];
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

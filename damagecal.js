function SearchPokemon(pokeID){
    let req = new XMLHttpRequest();  //HTTPでファイルを読み込む
    req.open("GET", "./PokemonDataBase/PokemonData.csv", false);    //ファイル取得

    try {
        req.send(null);
      } catch (err) {
        document.getElementById("result").innerHTML = "致命的なエラー";
      }
    
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


    for (let i=0; i < lines.length; ++i){
        let cells = lines[i].split(",");

        if(cells[0] == name){
            for (let j=0; j<6; ++j){
                let stats_v = parseInt(cells[j+1]); //種族値
                let IV_v = parseInt(IVs[j].value);  //個体値
                let EV_v = parseInt(EVs[j].value);  //努力値
                let result = stats_v + IV_v/2 + EV_v/8;
                if (j == 0){                        //　HP
                    result = parseInt(result +60);
                }else{                              //　それ以外
                    result = parseInt(result +5);
                    result = parseInt(result * nature_appList[j]);
                }
                poke.getElementsByClassName("status")[j].innerHTML = result;
            }
            return;
        }
    }
}

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

function clickResultDisp(){
    var atk = document.getElementById("attack").value;
    var def = document.getElementById("defence").value;
    var pwr = document.getElementById("power").value;
    var efc = document.getElementById("effect").value;
    atk = parseInt(atk); def = parseInt(def); pwr = parseInt(pwr)
    var result;
    result = 22 * parseInt(pwr * atk / def);
    result = parseInt(result /50) +2;
    var min;
    min = parseInt(0.85 * result);
    if (document.getElementById("STAB").checked){
        result = parseInt(result * 1.5);
        min = parseInt(min * 1.5);
    }
    result = parseInt(result * efc);
    min = parseInt(min * efc);
    document.getElementById("result").innerHTML = String(min) + ' ~ ' + String(result);
}

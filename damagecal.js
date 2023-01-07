function SearchPokemon(){
    let req = new XMLHttpRequest();  //HTTPでファイルを読み込む
    req.open("GET", "./PokemonDataBase/PokemonData.csv", false);    //ファイル取得


    try {
        csv.send(null);
      } catch (err) {
        document.getElementById("result").innerHTML = "jdiafowe";
      }

    let csvArray =[];
    //ポケモン1の名前取得
    var poke1 = document.getElementById("poke-name1").value;
    let lines = req.responseText.split(",");

    

    for (let i=0; i < lines.length; ++i){
        let cells = lines[i].split(",");

        if(cells[0] == poke1){
            for (let j=1; j<7; ++j){
                document.getElementsByClassName("status").innerHTML = cells[j];
            }
            return;
        }
    }
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

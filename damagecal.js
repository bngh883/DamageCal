//ダメージ計算関数
function clickResultDisp(num){
    let poke1 = document.getElementById("form1");  //攻撃側ポケモン
    let poke2 = document.getElementById("form2");  //防御側ポケモン
    let moveid;
    switch (num) {
        case 1:
            moveid = "move1";break;
        case 2:
            moveid = "move2";break;
        case 3:
            moveid = "move3";break;
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
    let pwr = move.getElementsByClassName("power")[0].value;  //いりょく
    let move_type = move.getElementsByClassName("move-type");
    let poke1_type = poke1.getElementsByClassName("poke-type");
    let poke2_type = poke2.getElementsByClassName("poke-type");
    //タイプ相性
    let efc = TypeCompa(move_type[0].value, poke2_type[0].value, poke2_type[1].value);
    atk = parseInt(atk); def = parseInt(def); pwr = parseInt(pwr);
    let result;
    result = Math.floor(22 * pwr * atk / def);
    result = Math.floor(result /50) +2;
    let min;
    min = Math.floor(0.85 * result);                       //最低乱数(乱数補正計算後は切り捨て)
    //一致補正(五捨五超入)
    if (move_type[0].value==poke1_type[0].value || move_type[0].value==poke1_type[1].value){     
        result = toInt(result * 1.5);
        min = toInt(min * 1.5);
    }
    //タイプ相性反映
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



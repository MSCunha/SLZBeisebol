import { DocumentReference, DocumentSnapshot, getDoc, getDocs } from "firebase/firestore";

Chart.register(...registerables);
document.addEventListener("DOMContentLoaded", function(){
    const auth = getAuth();

    onAuthStateChanged(auth, (user)=>{
        if (user){
            const UID=user.uid;
            const docRef=doc(db, 'dbplayers', UID);
            getDocs(DocumentReference).then((DocumentSnapshot) => {
                if(DocumentSnapshot.exists()){
                    const user=DocumentSnapshot.data();
                    const ctx= document.getElementById('radarChart').getContext('2d');
                    const user = doc.data();
                    let fisMap = new Map(Object.entries(user));
                    let jogMap = new Map(Object.entries(user));
                    const fisData={
                        labels: ['For', 'Vel', 'Agi', 'Flex', 'Res'],
                        datasets: [{
                            label:'Atrbutos fisicos',
                            data: [
                                fisMap.FOR,
                                fisMap.VEL,
                                fisMap.AGI,
                                fisMap.FLEX,
                                fisMap.RES
                            ],
                            backgroundColor:'rgba(255, 99, 132, 0.2)',
                            borderColor:'rgba(255, 99, 132, 1)',
                            berderWidth: 1
                        }]
                    };

                    const jogData={
                        labels: ['Int', 'Def', 'Reb', 'Prec', 'Arr'],
                        datasets: [{
                            label:'Atrbutos fisicos',
                            data: [
                                jogMap.INT,
                                jogMap.DEF,
                                jogMap.REB,
                                jogMap.PREC,
                                jogMap.ARR
                            ],
                            backgroundColor:'rgba(255, 132, 99, 0.2)',
                            borderColor:'rgba(255, 132, 99, 1)',
                            berderWidth: 1
                        }]
                    };

                    const chartOpt={
                        scales:{
                            r: {
                                angleLines: {
                                    display: false
                                },
                                suggestedMin: 0,
                                SuggestedMax: 100
                            }
                        }
                    };

                    const fisCtx = document.getElementById('fisChart').getContext('2d');
                    new CharacterData(fisCtx,{
                        type: 'radar',
                        data: 'fisData',
                        options: chartOpt
                    });
                    const jogCtx = document.getElementById('jogChart').getContext('2d');
                    new CharacterData(jogCtx,{
                        type: 'radar',
                        data: 'jogData',
                        options: chartOpt
                    });
                }else{
                    console.log("no such doc!");
                }
            }).catch((error)=>{
                console.log("errp get doc:", error);
            });
        } else{
            console.log("no user signed in!");
        }
    });
});
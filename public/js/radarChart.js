import { DocumentReference, DocumentSnapshot, getDoc, getFirestore } from "firebase/firestore";

Chart.register(...registerables);
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Chart, registerables } from 'chart.js';
import { db } from './auth.js';

Chart.register(...registerables);

document.addEventListener("DOMContentLoaded", function() {
    const auth = getAuth();
    const db = getFirestore();

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const UID = user.uid;
            const docRef = doc(db, 'dbplayers', UID);
            try {
                const documentSnapshot = await getDoc(docRef);
                if (documentSnapshot.exists()) {
                    const userData = documentSnapshot.data(); 
                    let fisMap = new Map(Object.entries(userData));
                    let jogMap = new Map(Object.entries(userData));

                    const fisData = {
                        labels: ['For', 'Vel', 'Agi', 'Flex', 'Res'],
                        datasets: [{
                            label: 'Atributos físicos',
                            data: [
                                fisMap.get('FOR'),
                                fisMap.get('VEL'),
                                fisMap.get('AGI'),
                                fisMap.get('FLEX'),
                                fisMap.get('RES')
                            ],
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }]
                    };

                    const jogData = {
                        labels: ['Int', 'Def', 'Reb', 'Prec', 'Arr'],
                        datasets: [{
                            label: 'Atributos de jogo',
                            data: [
                                jogMap.get('INT'),
                                jogMap.get('DEF'),
                                jogMap.get('REB'),
                                jogMap.get('PREC'),
                                jogMap.get('ARR')
                            ],
                            backgroundColor: 'rgba(255, 132, 99, 0.2)',
                            borderColor: 'rgba(255, 132, 99, 1)',
                            borderWidth: 1
                        }]
                    };

                    const chartOpt = {
                        scales: {
                            r: {
                                angleLines: {
                                    display: false
                                },
                                suggestedMin: 0,
                                suggestedMax: 100
                            }
                        }
                    };

                    const fisCtx = document.getElementById('fisChart').getContext('2d');
                    new Chart(fisCtx, {
                        type: 'radar',
                        data: fisData,
                        options: chartOpt
                    });

                    const jogCtx = document.getElementById('jogChart').getContext('2d');
                    new Chart(jogCtx, {
                        type: 'radar',
                        data: jogData,
                        options: chartOpt
                    });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.log("Error getting document:", error);
            }
        } else {
            console.log("No user signed in!");
        }
    });
});

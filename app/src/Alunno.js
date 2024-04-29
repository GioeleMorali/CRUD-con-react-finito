import {useState} from 'react';

export default function Alunno({alunno, loadAlunni}){

    const [inCancellazione, setInCancellazione] = useState(false);
    const [inMod, setInMod] = useState(false);

    const [inConferma, setInConferma] = useState(false);
    const [inModifica, setInModifica] = useState(false);

    const [nome, setNome] = useState("");
    const [cognome, setCognome] = useState("");

    async function cancellaAlunno(){
        setInCancellazione(true);
        await fetch(`http://localhost:8080/alunni/${alunno.id}`, {method: "DELETE"});
        loadAlunni();
        setInCancellazione(false);
    }
    async function modificaAlunno(){
        setInMod(true);
        await fetch(`http://localhost:8080/alunni/${alunno.id}`, 
        {method: "PUT",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({nome: nome, cognome: cognome})
        });
        loadAlunni();
        setInMod(false);
    }
    function richiediConferma(){
        setInConferma(true);
    }
    function richiediModifica(){
        setInModifica(true);
    }
    function annullaModifica(){
        setInModifica(false);
    }
    function annulla(){
        setInConferma(false);
    }
    function gestisciCambioNome(e){
        setNome(e.target.value);
    }
      function gestisciCambioCognome(e){
        setCognome(e.target.value);
    }
    return(
        <div>
            {alunno.id} 
            {!inModifica &&
                <>  - {alunno.nome} {alunno.cognome} -</>
            }
            { inCancellazione ?
                <span> in cancellazione... </span>
            :
                <span>
                    { inConferma ?
                        <span>Sei sicuro? 
                        <button onClick={cancellaAlunno}>si</button>
                        <button onClick={annulla}>no</button></span>
                        :
                        <span>
                            { !inModifica &&
                                <button onClick={richiediConferma}>Cancella alunno</button>
                            }
                        </span>
                    }
                </span>
            }
            { inMod ?
                <span> in modifica... </span>
                :
                <span>
                    { inModifica ?
                        
                        <>
                        <input type='text' placeholder='Inserisci il nome' onChange={gestisciCambioNome} value={nome}></input>
                        <input type='text' placeholder='Inserisci il cognome' onChange={gestisciCambioCognome} value={cognome}></input>
                        <span>Vuoi modificare?
                        <button onClick={modificaAlunno}>si</button>
                        <button onClick={annullaModifica}>no</button></span>
                        </>
                        :
                        <span>
                            { !inConferma &&
                                <button onClick={richiediModifica}>Modifica alunno</button>
                            }
                        </span>

                    }
                </span>
            }
            <hr />
        </div>
    );
}
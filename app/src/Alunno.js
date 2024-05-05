import {useState} from 'react';

export default function Alunno({alunno, loadAlunni, setInsert}){

    const [inCancellazione, setInCancellazione] = useState(false);
    const [inMod, setInMod] = useState(false);

    const [inConferma, setInConferma] = useState(false);
    const [inModifica, setInModifica] = useState(false);

    const [nome, setNome] = useState(alunno.nome);
    const [cognome, setCognome] = useState(alunno.cognome);


    function gestisciNome(e)
    {
        setNome(e.target.value);
    }
    function gestisciCognome(e)
    {
        setCognome(e.target.value);
    }
    function richiediConferma()
    {
        setInsert(false);
        setInConferma(true);
    }
    function richiediModifica()
    {
        setInsert(false);
        setInModifica(true);
    }
    function annullaModifica()
    {
        setInsert(true);
        setInModifica(false);
    }
    function annulla()
    {
        setInsert(true);
        setInConferma(false);
    }
    async function cancellaAlunno(){
        setInCancellazione(true);
        await fetch(`http://localhost:8080/alunni/${alunno.id}`,
        {method: "DELETE"}
        );
        loadAlunni();
        setInCancellazione(false);
        setInsert(true);
    }
    async function modificaAlunno(){
        setInMod(true);
        await fetch(`http://localhost:8080/alunni/${alunno.id}`,
        {method: "PUT",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({nome:nome, cognome:cognome})
        }
        );
        loadAlunni();
        setInMod(false);
        setInsert(true);
    }
    return(
        <div>
           {alunno.id}
           {!inModifica && <> {alunno.nome}  {alunno.cognome}</>}
           {inCancellazione ? 
           <span> In cancellazione...</span>
           :
           <span>
              { inConferma ?
                <span> Sei sicuro di voler cancellare?
                <button onClick={cancellaAlunno}>si</button>
                <button onClick={annulla}>no</button></span>
                :
                <span>
                    {!inModifica && 
                        <button onClick={richiediConferma}>Cancella alunno</button>
                    }
                </span>
              }
           </span>
        }
        {inMod ?
        <span> In modifica... </span>
        :
        <span>
            { inModifica ?
                <>
                <input type='text' placeholder='inserisci il nuovo nome' value={nome} onChange={gestisciNome}></input>
                <input type='text' placeholder='inserisci il nuovo cognome' value={cognome} onChange={gestisciCognome}></input>
                <span>Vuoi modificare?
                    <button onClick={modificaAlunno}>si</button>
                    <button onClick={annullaModifica}>no</button>
                </span>
                </>
                :
                <span>
                    {!inConferma &&
                        <button onClick={richiediModifica}>Modifica alunno</button>
                    }
                </span>
            }
        </span>
        }
        </div>
    );
}
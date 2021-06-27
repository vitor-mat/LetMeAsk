/*foi necessário o ignore pois a máquina de desenvolvimento
trabalhou com recursos antigos para o desenvolvimento, gerando problemas na
instalação da dependencia do react route*/
// @ts-ignore
import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from "../components/Button"

import "../styles/auth.scss"
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

export function NewRoom(){
    const { user } = useAuth();
    const [newRoom, setNewRoom] = useState(""); 
    const history = useHistory();

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();
        
        if(newRoom.trim() == ''){
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        });

        history.push(`${firebaseRoom.key}`)
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="letmeask"/>
                <strong>Crie Salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="letmeask"/>
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange = {event => setNewRoom(event.target.value)}
                            value = {newRoom}/>
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}
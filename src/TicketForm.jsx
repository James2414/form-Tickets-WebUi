import React, { useState } from "react";

const TicketForm = () => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('');
    const [description, setDescription] = useState('');
    const [resolved, setResolved] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !priority) {
            setErrorMessage('El TITULO y la PRIORIDAD son campos obligatorios');
            return;
        }
        if (title.length < 6 || title.length > 18) {
            setErrorMessage('titulo entre 8 y 18 carac');
            return;
        }
        const ticketData = {
            title,
            priority: parseInt(priority),
            description,
            resolved
        };

        try {
            const response = await fetch('http://localhost:3000/tickets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(ticketData),
            });
            if (!response.ok) {
                throw new Error('error al ctraer ticket');
            }
            alert('ticket creado');
            setTitle('');
            setPriority('');
            setDescription('');
            setResolved(false);
            setErrorMessage('');
        } catch (error) {
            console.error('eerror al craer ticket', error);
            setErrorMessage('error al crear el ticket, siga intentando');
        }
    };

    return (
        <div className="div1">
            <h2 className="sub" >Crear Ticket</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="titu">Título:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label className="prt">Prioridad:</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="">Selecciona la prioridad</option>
                        <option value="1">Baja</option>
                        <option value="2">Media</option>
                        <option value="3">Alta</option>
                    </select>
                </div>
                <div>
                    <label className="desc">Descripción:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={resolved}
                            onChange={(e) => setResolved(e.target.checked)}
                        />
                      <h4 className="resuelto">Resuelto </h4>
                    </label>
                </div>
                <button type="submit">Crear Ticket</button>
            </form>
        </div>
    );
};

export default TicketForm;

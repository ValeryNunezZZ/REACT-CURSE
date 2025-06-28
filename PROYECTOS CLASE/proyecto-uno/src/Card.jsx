import { useState } from "react";


function Card({foto = {fotoPerfil}, nombre = "Valery Nuñez", dia = 17, mes = 6, anio = 2025, comments = 132, repost = 368, likes = 4300, saves = 538}){

    const [likesAct, setLikes] = useState(likes);
    const [commentsAct, setComments] = useState(comments);
    const [repostAct, setRepost] = useState(repost);
    const [savesAct, setSaves] = useState(saves);


    const aumentarLikes = () => {
        setLikes(likesAct + 1);
    }

    const aumentarComentarios = () => {
        setComments(commentsAct + 1);
    }

    const aumentarPosts = () => {
        setRepost(repostAct + 1);
    }

    const aumentarSaves = () => {
        setSaves(savesAct + 1);
    }

    return(
        <>
            <div className="card shadow-sm mb-3" style={{ maxWidth: "600px" }}>
                <div className="card-body">
                <div className="d-flex align-items-start mb-3">
                    <img
                    src={foto}
                    alt="Foto de perfil"
                    className="rounded-circle me-3"
                    style={{ width: "48px", height: "48px", objectFit: "cover" }}
                    />
                    <div>
                    <h6 className="mb-0">{nombre}</h6>
                    <small className="text-muted">@usuario · 1h</small>
                    </div>
                </div>

                <p className="card-text">
                    We let down our customers at <span className="text-primary">@Cloudflare</span> today. Our Workers KV service failed and the downstream products that rely on that service had outages of their own. We will publish a full postmortem soon.
                </p>

                <div className="d-flex justify-content-between mt-3">
                    <button className="btn btn-outline-secondary btn-sm" onClick={aumentarLikes}>
                    👍🏻 {likesAct}
                    </button>
                    <button className="btn btn-outline-secondary btn-sm" onClick={aumentarComentarios}>
                    💬 {commentsAct}
                    </button>
                    <button className="btn btn-outline-secondary btn-sm" onClick={aumentarPosts}>
                    🔁 {repostAct}
                    </button>
                    <button className="btn btn-outline-secondary btn-sm" onClick={aumentarSaves}>
                    📌 {savesAct}
                    </button>
                </div>
                </div>
            </div>
        </>
    );

}

export default Card;
import React from "react";
import PropTypes from 'prop-types';

export const Card = (props)=>{
    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 col-lg-12">
                        <div className="card ocultar">
                            <div className="row">
                                { /* CONTENIDO */ }
                                <div className="col-9">
                                    <input
                                        type="text"
                                        className="bentham-regular input-sin-borde"
                                        value={props.editarId === props.id ? props.editarTexto : props.content}
                                        onChange={(e) => props.setEditarTexto(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                props.actualizar(props.id)
                                            }
                                        }}
                                        onBlur={() => {
                                            props.setEditarId(null)
                                            props.setEditarTexto("")
                                        }}
                                        disabled={props.editarId !== props.id}
                                    />
                                </div>

                                { /* Actualizar */ }
                                <div className="col-1 delete d-flex justifi-content-center align-items-center">
                                    <a href="#" className="bentham-regular fs-4" onClick={props.editar}>
                                        <i className="bi bi-pencil"></i>
                                    </a>
                                </div>

                                { /* Check */ }
                                <div className="col-1 delete d-flex justifi-content-center align-items-center">
                                    <a href="#" className="bentham-regular fs-4" onClick={props.checkTarea}>
                                        <i>{props.isDone === true ? "✅" : "❌"}</i>
                                    </a>
                                </div>

                                { /* ElIMINAR */ }
                                <div className="col-1 delete d-flex justifi-content-center align-items-center">
                                    <a href="#" className="bentham-regular fs-4" onClick={props.eliminar}>
                                        <i className="bi bi-trash"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

Card.propTypes = {
  id: PropTypes.number,
  content: PropTypes.string,
  eliminar: PropTypes.func,
  editar: PropTypes.func,
  editarId: PropTypes.number,
  editarTexto: PropTypes.string,
  setEditarTexto: PropTypes.func,
  setEditarId: PropTypes.func,
  actualizar: PropTypes.func,
  checkTarea: PropTypes.func,
  isDone: PropTypes.bool
};
import React from "react";
import { useEffect ,useState } from "react";
import { Card } from "./Card";



//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	const[inputV,setInputV] = useState("")
	const[list , setList] = useState([])
	const[error , setError] = useState("")
	const[editarId, setEditarId] = useState(null)
	const [editarTexto, setEditarTexto] = useState("")
	const [loading, setLoading] = useState(false)

	const URL = "https://playground.4geeks.com/todo"
	const usuario = "milton"


	//Traer informacion del server y guardarlo en list
	const getData = async () => {
		try{
			setLoading(true)
			const res = await fetch(`${URL}/users/${usuario}`)
			const data = await res.json()

			setList(data.todos)
		}catch (err){
			console.log("Error: ", err);
		}finally{
			setLoading(false)
		}
	}

	useEffect(() => {
		getData()
	}, [])



	//Escuchar input
	const listenletter =(event)=>{
		const newListen = (event.target.value);
		setInputV(newListen)
		console.log(newListen)
	}

	//Agregar elementos del input
	const addList = async (event)=>{
		try{
			if (event.key === "Enter"){

				if(inputV.trim() === ""){
					setError("No puede enviar el campo vacio")
				return
				}

				if(inputV.length <= 3 ){
					setError("Debe de ingresar mas de 3 caracteres")
				return
				}

				setError("")
				setLoading(true)

				const newTodo ={
					label: inputV,
					is_done: false
				}

				const res = await fetch(`${URL}/todos/${usuario}`,{
					method: "POST",
					body: JSON.stringify(newTodo),
					headers: {
						"Content-Type": "application/json"
					}
				})

				setInputV("")
				getData()
		}
		}catch (err){
			console.log(`ERROR:`,err)
		}finally{
			setLoading(false)
		}
	}

	//Eliminar
	const eliminar = async (id)=>{
		try {
			const res = await fetch(`${URL}/todos/${id}`,{
				method:"DELETE"
			})

			getData()
		} catch (err) {
			console.log(`ERRRO: `,err)
		}
	}

	//Borrar todo
	const eliminarTodo = async()=>{
		try {
			for (const item of list) {
			await fetch(`${URL}/todos/${item.id}`, {
				method: "DELETE"
			})
			}

			getData()

		} catch (err) {
			console.log("ERROR:", err)
		}
	}


	// Activar input de edicion
	const editar = (id, label) => {
		setEditarId(id)
		setEditarTexto(label)
	}

	// Actualizar
	const actualizar = async (id) => {
	try {
		if (editarTexto.trim() === "") {
			setError("No puede enviar el campo vacío")
			return
			}

		if (editarTexto.length <= 3) {
			setError("Debe de ingresar más de 3 caracteres")
			return
			}

		setError("")

		const res = await fetch(`${URL}/todos/${id}`, {
			method: "PUT",
			body: JSON.stringify({
				label: editarTexto,
				is_done: false
			}),
			headers: {
				"Content-Type": "application/json"
			}
		})

		setEditarId(null)
		setEditarTexto("")
		getData()

	} catch (err) {
			console.log("ERROR:", err)
		}
	}


	//Contar tarjetas
	const contar = list.length === 0 
      ? "No tienes ningun item"
      : list.length === 1 
        ? "Tienes 1 item"
        : `Tienes ${list.length} items`


	//Pasar props y renderizar tarjeta	
	const cards = list.map((elemento)=>{
		return (
			<Card 
			key={elemento.id}
			id={elemento.id}
			content={elemento.label}
			eliminar={() => eliminar(elemento.id)}
			editarId={editarId}
			editar={() => editar(elemento.id, elemento.label)}
			editarTexto={editarTexto}
			setEditarTexto={setEditarTexto}
			setEditarId={setEditarId}
			actualizar={actualizar}
			 />
		)
	})

	


	return (
		<div className="text-center">
            <div className="container">
				<div className="row justify-content-center mt-4">
					<div className="col-12 col-lg-6">
						<div className="card bgcolor">
							<img src={rigoImage} className="w-50 mx-auto d-block mt-4" />
							<input type="text" onChange={listenletter} onKeyDown={addList} value={inputV} className="w-50 mt-4 fs-4  mx-auto" placeholder="Ingrese el texto" />
							{loading && (
								<div className="text-center mt-2">
									<div className="spinner-border spinner-border-sm text-primary"></div>
								</div>
							)}
							<p className="text-danger bentham-regular">{error}</p>
							{cards}

							<div className="row">
								<div className="col-12">
									<div className="row">

									<div className="col-6">
										<p className="text-start m-3">{contar}</p>
									</div>

									<div className="col-6">
										<button type="button" className="bg-danger m-3" onClick={()=>eliminarTodo()}>Eliminar todo</button>
									</div>

									</div>
								</div>
							</div>
						</div>
					</div>

				</div>

			</div>
		</div>
	);
};

export default Home;
async function startServer(server: any): Promise<void> {
	const PORT = process.env.PORT || 3000
	server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}

export default startServer

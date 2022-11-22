const { response } = require('@hapi/hapi/lib/validation')
const Models = require('../models/index')

const booksHandler = async (request, h) => {
    try {
        const books = await Models.Books.findAll({})
        return h.response({ 
            data: books,
            status: 200
        }).code(200)
    } catch (error) {
        return h.response({ error: error.message }).code(400)
    }
}

const createBookHandler = async (request, h) => {
    try {
        const { name, year, author, summary, publisher, pageCount, readPage, finished, reading } = request.payload;

        if(name == null){
            return h.response({
                status: "Fail",
                message: 'Gagal menambahkan buku. Mohon isi nama buku'
            }).code(400)
        }

        if(readPage > pageCount){
            return h.response({
                status: "Fail",
                message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
            }).code(400)
        }
        else{
            const book = await Models.Books.create({
                name: name,
                year: year,
                author: author,
                summary: summary,
                publisher: publisher,
                pageCount: pageCount,
                readPage: readPage,
                finished: finished,
                reading: reading
            })
            return h.response({
                data: book,
                message: 'New todo has been created.'
            }).code(201)
        }
    } catch (error) {
        return h.response({
            error: error.message,
            status: "error",
            message: "Buku gagal ditambahkan"
        }).code(500)
    }
}

const detailBookHandler = async (request, h) => {
    try {
        const book_id = request.params.id;
        const book = await Models.Books.findOne({
            where: {
                id: book_id
            }
        })
        return h.response({ 
            data: book
        }).code(200)
    } catch (error) {
        return h.response({ 
            error: error.message,
            status: "fail",
            message: "Buku tidak ditemukan"
        }).code(404)
    }
}

const updateBookHandler = async (request, h) => {
    try {
        const book_id = request.params.id;
        const { name, year, author, summary, publisher, pageCount, readPage, finished, reading } = request.payload;

        if(name == null){
            return h.response({
                status: "Fail",
                message: 'Gagal menambahkan buku. Mohon isi nama buku'
            }).code(400)
        }

        if(readPage > pageCount){
            return h.response({
                status: "Fail",
                message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
            }).code(400)
        }
        else{

            await Models.Books.update({
                name: name,
                year: year,
                author: author,
                summary: summary,
                publisher: publisher,
                pageCount: pageCount,
                readPage: readPage,
                finished: finished,
                reading: reading
            }, {
                    where: {
                        id: book_id
                    }
            })
            return h.response({
                status: "success",
                message: "Buku berhasil diperbarui"
            }).code(200)

        }

    } catch (error) {
        return h.response({
            error: error.message,
            status: "fail",
            message: "Gagal memperbarui buku. Id tidak ditemukan"
        }).code(404)
    }
}

const deleteBookHandler = async (request, h) => {
    try {
        const book_id = request.params.id;
        await Models.Books.destroy({
            where: {
                id: book_id
            }
        })
        return h.response({ 
            status: "success",
            message: "Buku berhasil dihapus" 
        }).code(200)
    } catch (error) {
        return h.response({
            error: error.message
        }).code(400)
    }
}

module.exports = [
    { method: 'GET', path: '/books', handler: booksHandler },
    { method: 'POST', path: '/books', handler: createBookHandler },
    { method: 'GET', path: '/books/{id}', handler: detailBookHandler },
    { method: 'PUT', path: '/books/{id}', handler: updateBookHandler },
    { method: 'DELETE', path: '/books/{id}', handler: deleteBookHandler }
];
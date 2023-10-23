
import { usersRepo } from '_helpers/server';
import { apiHandler } from '_helpers/server/api';

module.exports = apiHandler({
    GET: getAll,
    POST: create
});

async function getAll() {
    return 'test';
}

async function create(req: Request) {
    const body = await req.json();
    await usersRepo.create(body);
}


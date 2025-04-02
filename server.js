// Require the framework and instantiate it
const fastify = require('fastify')();
const mjml = require('mjml');

process.on('SIGINT', function() {
    process.exit();
});

fastify.get('/', async (request, reply) => {
    reply.code(200).send('MJML Server is running');
});

fastify.post(
    '/render',
    { bodyLimit: 10485760 },
    function (request, reply) {
        try {
            let rendered;
            try {
                let mjmlData = request.body.mjml;
                rendered = mjml(mjmlData).html;
            } catch (e) {
                console.log(e);
                reply
                    .code(400)
                    .type('application/problem+json')
                    .send(
                        JSON.stringify(
                            {
                                title: "MJML Error",
                                detail: e.message
                            }
                        )
                    );
                return;
            }

            reply
                .code(200)
                .type('text/html')
                .send(rendered);

        } catch (e) {
            console.log(e);
            reply
                .code(500)
                .type('application/problem+json')
                .send(
                    JSON.stringify(
                        {
                            title: "Server Error",
                            detail: e.message
                        }
                    )
                );

        }
    }
);

// Run the server!
fastify.listen(80, '0.0.0.0', function (err) {
    if (err) throw err;
    console.log(`server listening on ${fastify.server.address().port}`)
});



module.exports = [
    {
        url: '/mock/system/dict/data/type/',
        type: 'get',
        headers: {
          isToken: false
        },
        response: config => {
            return {
                code: 200,
                data: []
            }
        }
    },

]

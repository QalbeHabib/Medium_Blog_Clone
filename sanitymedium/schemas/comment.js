export default {
    name: 'comment',
    type:'document',
    title:'Comment',
    fields: [
        {
            name:'Name',
            type:'string',
        },
        {
            title:'Approved',
            name:'approved',
            type:'boolean',
            description:'Comment won\'t be visible to the public unless approved',
        },
        {
            name:'email',
            type:'string',
        }
        ,{
            name:'comment',
            type:'text',
        },
        {
            name:'post',
            type:'reference',
            to:[{type:'post'}],
        }

    ]
}
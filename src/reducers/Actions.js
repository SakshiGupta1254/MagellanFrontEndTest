export const PostAction = (data) => {
    return {
        type: 'ADD_POST',
        data: data
    }
}

export const DeleteAction = (id) => {
    return {
        type: 'DELETE_POST',
        id
    }
}

export const EditAction = (id) => {
    return {
        type: 'EDIT_POST',
        id
    }
}

export const UpdateAction = (data) => {
    return {
        type: 'UPDATE_POST',
        data
    }
}
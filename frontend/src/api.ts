let data: any = {
    'Tabela 1': [],
    'Tabela 2': [],
    'Tabela 3': [],
};

let idCounter = 1;

export const getData = async (tableName: keyof typeof data) => {
    return data[tableName];
};

export const createData = async (tableName: keyof typeof data, item: any) => {
    item.id = idCounter++;
    data[tableName].push(item);
    return item;
};

export const updateData = async (tableName: keyof typeof data, item: any) => {
    const index = data[tableName].findIndex((i: any) => i.id === item.id);
    if (index !== -1) {
        data[tableName][index] = item;
    }
    return item;
};

export const deleteData = async (tableName: keyof typeof data, id: number) => {
    data[tableName] = data[tableName].filter((item: any) => item.id !== id);
};
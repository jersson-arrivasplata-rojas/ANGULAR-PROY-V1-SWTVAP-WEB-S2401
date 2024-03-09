

// Esta función debería buscar y devolver el valor correspondiente al 'key' dado.
// Deberás reemplazarla con la lógica que corresponda a la estructura de tu JSON.
function findValueByKey(key: string, data: any, type?: number): any {
    // Implementar lógica para buscar en la estructura JSON
    // Este es un ejemplo, debes reemplazarlo con tu propio código

    let foundValue = null;
    if (data && data.children) {
        data.children.forEach(child => {
            if (child.code === key) {
                foundValue = type ? child[`value${type}`] : child.value;
            }
        });
    }

    return foundValue;
}

export function ConfigValue(key: string, type?: number) {
    return function (target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            get: function (this: { data: any }) {
                // Aquí es donde se debería buscar en la estructura JSON real,
                // pero por ahora lo dejaré como un valor dummy.
                return type ? findValueByKey(key, this.data, type) : findValueByKey(key, this.data); // Esta función deberá implementarse para buscar realmente el valor.
            },
            configurable: true,
            enumerable: true
        });
    };
}

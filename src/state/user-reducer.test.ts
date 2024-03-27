
import { userReducer } from "./user-reducer";


test('user reducer should increment only age', () => {
        const startState ={age: 20, childrenCout: 2, name: 'Dimych'};
        
        const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

        expect(endState.age).toBe(21);
        expect(endState.childrenCout).toBe(2);
});

test('user reducer should increment only childrenCount', () => {
    const startState ={age: 20, childrenCout: 2, name: 'Dimych'};
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})
    expect(endState.childrenCout).toBe(3);   
})

test('user reducer should change name of user', () => {
    const startState ={age: 20, childrenCout: 2, name: 'Dimych'};
    const endState = userReducer(startState, {type: 'CHANGE-NAME', newName: 'Viktor'})
    expect(endState.name).toBe('Viktor');})
import React, { useEffect, useState } from "react";
import "../../App.css";
import styled from "styled-components";
import { ReactComponent as Del } from "../../assets/delete.svg";
import { ReactComponent as Pl } from "../../assets/plus.svg";
import { ReactComponent as Rev } from "../../assets/revert.svg";
import { ReactComponent as TickG } from "../../assets/tick-green.svg";

function Todo() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            tittle: "Buy 1 kg Tomato",
        },
        {
            id: 2,
            tittle: "Buy 2 kg Onion",
        },
        {
            id: 3,
            tittle: "Visit Friend",
        },
        {
            id: 4,
            tittle: "Clean House",
        },
    ]);
    const [Completed, setComplete] = useState([
        {
            id: 5,
            tittle: "Washing Clothes",
        },
        {
            id: 6,
            tittle: "Play Cricket",
        },
        {
            id: 7,
            tittle: "1km Walking",
        },
        {
            id: 8,
            tittle: " Do Homework",
        },
    ]);

    const [item, setItem] = useState("");
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        setItemCount(Completed.length + tasks.length);
    }, []);

    function deleteItem(id) {
        let new_lists = tasks.filter((task) => task.id !== id);
        setTasks(new_lists);
    }

    const deleteCompleted = (id) => {
        let new_lists = Completed.filter((Complete) => Complete.id !== id);
        setComplete(new_lists);
    };
    const completeTask = (id) => {
        let current_task = tasks.find((task) => task.id === id);
        setComplete([...Completed, current_task]);

        let new_lists = tasks.filter((task) => task.id !== id);
        setTasks(new_lists);
    };

    const revertTask = (id) => {
        let current_tasks = Completed.find((Complete) => Complete.id === id);
        setTasks([...tasks, current_tasks]);

        let new_lists = Completed.filter((Complete) => Complete.id !== id);
        setComplete(new_lists);
    };
    const renderTask = () => {
        return tasks.map((task) => (
            <Items>
                <Round onClick={() => completeTask(task.id)}></Round>
                <Item>
                    {task.id}, {task.tittle}
                </Item>
                <Delete onClick={() => deleteItem(task.id)}>
                    <Del alt="DeleteImg" />
                </Delete>
            </Items>
        ));
    };

    const renderComplete = () => {
        return Completed.map((Complete) => (
            <Items>
                <RoundTick>
                    <TickG alt="TickImg" />
                </RoundTick>
                <Item>
                    {Complete.id}, {Complete.tittle}
                </Item>
                <Revet onClick={() => revertTask(Complete.id)}>
                    <Rev alt="RevertImg" />
                </Revet>
                <Delete onClick={() => deleteCompleted(Complete.id)}>
                    <Del alt="DeleteImg" />
                </Delete>
            </Items>
        ));
    };
    const addNewItem = (event) => {
        event.preventDefault();
        if (item) {
            let new_value = {
                id: itemCount + 1,
                tittle: item,
            };
            setTasks([...tasks, new_value]);
            setItem("");
            setItemCount((prev) => prev + 1);
        }
    };

    return (
        <Section>
            <Heading>Todo List</Heading>
            <Top>
                <SubHeading>Things to be done</SubHeading>
                <List>{renderTask()}</List>
                <Form>
                    <PlusIcon>
                        <Pl alt="PlusImg" />
                    </PlusIcon>
                    <Input
                        value={item}
                        onChange={(event) => setItem(event.target.value)}
                        placeholder="Type new task..."
                        id="Plus"
                    />
                    <Submit
                        onClick={(event) => {
                            addNewItem(event);
                        }}
                    >
                        Add New
                    </Submit>
                </Form>
            </Top>
            <Bottom>
                <SubHeading>Completed</SubHeading>
                <List>{renderComplete()}</List>
            </Bottom>
        </Section>
    );
}
export default Todo;

const Section = styled.section`
    width: 50%;
    margin: 0 auto;
    border-left: 3px solid #f6f6f6;
    border-right: 3px solid #f6f6f6;
    padding: 25px 85px;
`;
const Heading = styled.h1`
    font-size: 40px;
    text-align: center;
`;
const SubHeading = styled.h4`
    font-size: 25px;
    color: #040241;
`;
const Top = styled.div``;
const List = styled.ul``;
const Items = styled.li`
    display: flex;
    align-items: center;
    position: relative;
`;
const Item = styled.p`
    font-size: 20px;
    font-weight: 600;
`;
const Round = styled.span`
    width: 25px;
    height: 25px;
    border: 3px solid #040241;
    border-radius: 50%;
    margin-right: 12px;
    cursor: pointer;
`;
const Delete = styled.div`
    position: absolute;
    right: 0;
    cursor: pointer;
`;
const Form = styled.form`
    width: 100%;
    position: relative;
    margin-left: 55px;
`;
const Input = styled.input`
    padding: 13px 26px;
    width: 65%;
    font-size: 18px;
`;
const Submit = styled.button`
    padding: 13px 30px;
    font-size: 18px;
    background: #040241;
    color: #fff;
    display: inline-block;
    cursor: pointer;
`;
const Bottom = styled.div`
    color: #5ed7b4;
`;
const Revet = styled.div`
    position: absolute;
    right: 50px;
    cursor: pointer;
`;
const RoundTick = styled.span`
    width: 25px;
    height: 25px;
    border: 3px solid #5ed7b4;
    border-radius: 50%;
    margin-right: 12px;
    cursor: pointer;
    text-align: center;
`;
const PlusIcon = styled(Pl)`
    position: absolute;
    top: 19px;
    left: 7px;
    display: block;
`;

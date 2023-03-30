import React from "react";
// import api from "../../services/api";

import "./style.css";
import { useHistory } from "react-router-dom";

export interface Vaccine {
  id: number;
  name: string;
  description: string;
  lote: string; //lote
  applicator: string;
  location: string;
  date: string;
  order: number;
  vaccine_id: number;
}

interface TeacherItemProps {
  key: number;
  vaccine: Vaccine;
}

const convertDateTimeToDate = (date: any) => {
  const [result] = date.split("T");
  const [year, month, day] = result.split("-");
  return `${day}/${month}/${year}`;
};

const TeacherItem: React.FunctionComponent<TeacherItemProps> = ({
  vaccine,
}) => {
  const history = useHistory();
  return (
    <article className="vacinne-item">
      <header>
        <strong>{vaccine.name}</strong>
        <p>{vaccine.description}</p>
        <div>
          <ul>
            <li>
              <strong>Data:</strong> {convertDateTimeToDate(vaccine.date)}
            </li>
            <li>
              <strong>Localidade:</strong> {vaccine.location}
            </li>
            <li>
              <strong>Aplicador:</strong> {vaccine.applicator}
            </li>
            <li>
              <strong>Lote:</strong> {vaccine.lote}
            </li>
          </ul>
        </div>
        <button
          onClick={() => {
            history.push(`/vaccines/${vaccine.vaccine_id}`);
          }}
        >
          Saiba mais
        </button>
      </header>
    </article>
  );
};

export default TeacherItem;

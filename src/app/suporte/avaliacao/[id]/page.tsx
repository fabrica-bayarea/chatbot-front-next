'use client';

import { type ChangeEvent, type FormEvent, useState } from 'react';
import styled from 'styled-components';

import { updateSupportRating, updateSupportStatus } from '@/actions/support';
import { EmailButton } from '@/components/styled';
import { mediaQueries } from '@/utils/mediaQueries';

const Section = styled.section`
  background-color: white;
  border-radius: 16px;
  gap: 30px;
  height: fit-content;
  margin: 100px 25%;
  padding: 40px 60px;

  @media screen and (width <= 1024px) {
    margin: 100px 10%;
  }

  @media screen and (width <= 768px) {
    border-radius: 0;
    height: calc(100dvh - 50px);
    margin: 0;
    padding: 40px 20px;
  }
`;

const RatingSection = styled(Section)`
  & > h1 {
    font-size: 1.75rem;
  }

  & > h5 {
    font-family: var(--font-a);
    font-size: 1rem;
  }

  & > ul {
    display: flex;
    flex-direction: column;
    gap: 5px;
    list-style-type: none;
  }

  & > hr {
    background: linear-gradient(
      to right,
      transparent,
      var(--clr-lighter-gray),
      transparent
    );
    border: none;
    height: 2px;
    margin: 20px auto;
    width: 80%;
  }

  ${mediaQueries.mobileL} {
    & > h1 {
      font-size: 1.5rem;
    }
  }
`;

const RatingForm = styled.form`
  align-items: center;
  align-self: center;
  display: flex;
  flex-direction: column;
  height: 160px;
  justify-content: space-between;
  max-width: 480px;
  width: 100%;

  & > span {
    font-size: 1.2rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  & > div {
    display: flex;
    justify-content: space-between;

    & > label {
      align-items: center;
      cursor: pointer;
      display: flex;
      font-size: 1.25rem;
      gap: 5px;

      * {
        cursor: pointer;
      }
    }

    &:first-child {
      font-size: 0.6rem;
      font-weight: bold;
      text-transform: uppercase;
    }
  }
`;

function Rating({ params }: { params: { id: string } }) {
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [success, setSuccess] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess(true);
    await updateSupportStatus(params.id, 'closed');
    await updateSupportRating(params.id, rating as number);
  };

  return (
    <>
      <RatingSection>
        <h1>Avaliação de atendimento</h1>
        <p>
          Sua opinião é essencial para nós! Por favor, avalie o atendimento recebido e
          ajude a melhorar nossos serviços.
        </p>
        <h5>Por que sua avaliação é importante?</h5>
        <ul>
          <li>Melhoria contínua: Sua opinião nos ajuda a aprimorar nosso atendimento.</li>
          <li>
            Reconhecimento: Avaliações positivas motivam e reconhecem o bom trabalho de
            nossos colaboradores.
          </li>
          <li>
            Transparência: <i>Feedback</i> de usuários promovem um ambiente de confiança e
            transparência.
          </li>
        </ul>
        <hr />
        <RatingForm onSubmit={handleSubmit}>
          {success ? (
            <span>Agradecemos sua avaliação!</span>
          ) : (
            <>
              <InputContainer>
                <div>
                  <span>Péssimo</span>
                  <span>Excelente</span>
                </div>
                <div>
                  <label htmlFor="rating-one">
                    <input
                      type="radio"
                      id="rating-one"
                      name="rating"
                      value="1"
                      onChange={handleChange}
                    />
                    <span>1</span>
                  </label>
                  <label htmlFor="rating-two">
                    <input
                      type="radio"
                      id="rating-two"
                      name="rating"
                      value="2"
                      onChange={handleChange}
                    />
                    <span>2</span>
                  </label>
                  <label htmlFor="rating-three">
                    <input
                      type="radio"
                      id="rating-three"
                      name="rating"
                      value="3"
                      onChange={handleChange}
                    />
                    <span>3</span>
                  </label>
                  <label htmlFor="rating-four">
                    <input
                      type="radio"
                      id="rating-four"
                      name="rating"
                      value="4"
                      onChange={handleChange}
                    />
                    <span>4</span>
                  </label>
                  <label htmlFor="rating-five">
                    <input
                      type="radio"
                      id="rating-five"
                      name="rating"
                      value="5"
                      onChange={handleChange}
                    />
                    <span>5</span>
                  </label>
                </div>
              </InputContainer>
              <EmailButton type="submit" disabled={!rating}>
                Avaliar
              </EmailButton>
            </>
          )}
        </RatingForm>
      </RatingSection>
    </>
  );
}

export default Rating;

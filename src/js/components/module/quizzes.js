import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link, hashHistory } from 'react-router';

const Quizzes = ({ location, quizzes, sendQuizInvite, module_id, isSurvey, handleSetIsSurvey }) => {

    const surveyOrQuiz = isSurvey ? 'survey' : 'quiz';
    const surveyIdOrQuizId = isSurvey ? 'survey_id' : 'quiz_id';
    const surveyOrQuizCapitalized = isSurvey ? 'Survey' : 'Quiz';
    const surveyOrQuizPluralCapitalized = isSurvey ? 'Surveys' : 'Quizzes';

    const desktopView = quizzes.slice().reverse().map((quiz, index) => {

        let iconClasses = classnames("fa", {
            "fa-check": quiz.is_presented === true,
            "fa-times": quiz.is_presented === false
        });

        let is_last_quizClasses = classnames("fa", {
            "fa-check": quiz.is_last_quiz
        });

        let buttonClass = classnames("", {
            "display-none": quiz.is_presented
        });

        let quizHistoryClass = classnames("", {
            "display-none": !quiz.is_presented
        });

        let editQuizClass = classnames("", {
            "display-none": quiz.is_presented
        });

        return (
          <div
              key={ index }
              className="module-quiz"
              onClick={ () => {

                  if (quiz.is_presented) {
                    handleSetIsSurvey(quiz.quiz_id, quiz.survey_id);
                  }

                  const url = `${module_id}/${quiz[surveyIdOrQuizId]}/${
                      quiz.is_presented ? 'members' : 'edit-' + surveyOrQuiz
                  }`;

                  hashHistory.push(url);

              } }
          >
            <span className="module-quiz__index">{ index + 1 }</span>
            {
              quiz.is_presented
              ? <p className="logo--white quiz__logo--white"></p>
              : <p className="logo quiz__logo"></p>
            }
            <div className="f-header module-quiz__name">{ quiz.name }</div>
            <div className="module-quiz__questions">{ `${ +quiz.num_questions } Question${ +quiz.num_questions === 1 ? '' : 's'}` }</div>
            {
              quiz.is_presented
              ? <div className="module-quiz__entries">{ +quiz.num_entries + ' entries' }</div>
              : <div className="module-quiz__buttons">
                    <button
                    className="button button__primary"
                    onClick={ (e) => {
                        e.stopPropagation();
                        hashHistory.push(`${location.pathname}/live`);
                        sendQuizInvite(quiz.quiz_id, quiz.survey_id, quiz.name);
                    } }>Run { surveyOrQuizCapitalized }</button>
                    <button
                    className="button button__primary"
                    onClick={ (e) => {
                        e.stopPropagation();
                        hashHistory.push(`${location.pathname}/live`);
                        sendQuizInvite(quiz.quiz_id, quiz.survey_id, quiz.name, true);
                    } }>Preview { surveyOrQuizCapitalized }</button>
                </div>
            }
            {
                quiz.is_last_quiz &&
                    <span className="module-quiz__last-message">(This is the last quiz)</span>
            }
            <div className="line"></div>
          </div>
        );
    });

    return (
        <div className="quizzes">
            <h3 className="headline module__headline">
                { surveyOrQuizPluralCapitalized }
            </h3>
            <div className="table">
                { desktopView }
            </div>
            <Link className="module__button__link" to={ `${module_id}/new-quiz` } >

                <button className="button button__secondary quizzes__button">
                    <span className="icon">
                        <i className="fa fa-plus" />
                    </span>
                    <span>Add a new { surveyOrQuiz }</span>
                </button>
            </Link>
        </div>
    );
};

Quizzes.propTypes = {
    location: PropTypes.object.isRequired,
    quizzes: PropTypes.array.isRequired,
    sendQuizInvite: PropTypes.func.isRequired,
    module_id: PropTypes.string.isRequired,
    isSurvey: PropTypes.bool,
    handleSetIsSurvey: PropTypes.func.isRequired
};

export default Quizzes;

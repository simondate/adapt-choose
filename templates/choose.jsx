import Adapt from 'core/js/adapt';
import React from 'react';
import a11y from 'core/js/a11y';
import { templates, classes, html, compile } from 'core/js/reactHelpers';

export default function Choose(props) {
  const ariaLabels = Adapt.course.get('_globals')._accessibility._ariaLabels;

  const {
    _id,
    _isEnabled,
    _isInteractionComplete,
    _isCorrect,
    _isActive,
    _shouldShowMarking,
    displayTitle,
    body,
    instruction,
    onKeyPress,
    onItemFocus,
    onItemOptionSelect,
    _isCorrectAnswerShown,
  } = props;

  return (
    <div className='component__inner choose__inner'>
      <templates.header {...props} />

      <div
        className={classes([
          'component__widget',
          'choose__widget',
          !_isEnabled && 'is-disabled',
          _isInteractionComplete && 'is-complete is-submitted show-user-answer',
          _isCorrect && 'is-correct'
        ])}
        role='radiogroup'
        aria-labelledby={
          (displayTitle || body || instruction) && `${_id}-header`
        }
      >

        {props._items.map(({ text, _graphic, _options, _index, _isCorrect, _selected }, index) => (
          <div
            className={classes([
              `choose__item item-${index}`,
              _selected && 'is-selected',
              _selected && `selected-option-${_selected._index}`,
              _isInteractionComplete && _isCorrect && 'is-correct',
              _isInteractionComplete && !_isCorrect && 'is-incorrect'
            ])}
            key={_index}
            data-index={_index}>
            <div
              className={classes([
                'choose__item-state',
                _isInteractionComplete && _isCorrect && 'choose__item-correct-icon',
                _isInteractionComplete && !_isCorrect && 'choose__item-incorrect-icon'
              ])}
            >
              <div className='icon'></div>
            </div>
            <div className='choose__item-text'>
              {html(compile(text))}
            </div>
            <templates.image {..._graphic}
              classNamePrefixes={['choose__item']}
              attributionClassNamePrefixes={['component', 'choose']}
            />
            <div className='choose__item-choices'>
              {_options.map((option) => (
                <div
                  className={classes([
                    'choose__item-choice',
                    option._isSelected && 'is-selected',
                    _isCorrectAnswerShown && option._isCorrect && 'is-correct',
                    _isCorrectAnswerShown && !option._isCorrect && 'is-incorrect'
                  ])}
                  key={option._index}
                >
                  <input
                    className="choose__item-input"
                    type='radio'
                    name={`choices-${_id}-${_index}`}
                    id={`input-${_id}-${_index}-${option._index}`}
                    value={option._index}
                    disabled={!_isEnabled}
                    aria-label={!_shouldShowMarking ?
                      a11y.normalize(option.text) :
                      `${option._isCorrect ? ariaLabels.correct : ariaLabels.incorrect}, ${option._isSelected ? ariaLabels.selectedAnswer : ariaLabels.unselectedAnswer}. ${a11y.normalize(option.text)}`}
                    data-adapt-index={_index}
                    onKeyPress={onKeyPress}
                    onChange={onItemOptionSelect}
                    onFocus={onItemFocus}
                  />
                  <label
                    className="choose__item-label"
                    aria-hidden={true}
                    htmlFor={`input-${_id}-${_index}-${option._index}`}
                    data-adapt-index={_index}
                  >

                    <div className='choose__item-choice-text'>
                      {html(compile(option.text))}
                    </div>

                    <templates.image {...option._graphic}
                      classNamePrefixes={['choose__item-choice']}
                      attributionClassNamePrefixes={['component', 'choose']}
                    />

                    <div className='choose__item-icon'>
                      <div className='icon'></div>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )
        )}
      </div>

      <div className='btn__container'></div>
    </div>
  );
}

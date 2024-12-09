
    <div className="space-y-2">
        {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center space-x-2">
                {question.type === 'multipleChoice' ? (
                    <RadioGroup>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`q${index}-option-${optionIndex}`} disabled />
                            <Label htmlFor={`q${index}-option-${optionIndex}`}>{option || `Option ${optionIndex + 1}`}</Label>
                        </div>
                    </RadioGroup>
                ) : (
                    <Checkbox id={`q${index}-option-${optionIndex}`} disabled />
                )}
                <Input
                    value={option}
                    onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                    placeholder={`Option ${optionIndex + 1}`}
                />
            </div>
        ))}
        <Button onClick={() => addOption(index)}>Add Option</Button>
    </div>

</>




---------------------------my code =----
case 'checkbox':
    return (
      <div className="space-y-2">
        {question.options.map((option, optionIndex) => (
          <div key={optionIndex} className="flex items-center space-x-2">
            {(
              <Checkbox id={`q${index}-option-${optionIndex}`} disabled />
            )}
            <Input
              value={option}
              onChange={(e) => updateOption(index, optionIndex, e.target.value)}
              placeholder={`Option ${optionIndex + 1}`}
            />
          </div>
        ))}
        <Button onClick={() => addOption(index)}>Add Option</Button>
      </div>
    )
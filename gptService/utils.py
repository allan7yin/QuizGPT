MOCK_PROMPT = '''
    Generate a multiple choice quiz of 5 questions, where there are 4 options for each question, of the difficulty "medium" from the following prompt: Addition.

    Also generate the correct answers for each of the questions generated from the prompt.
    Also, generate each option on a new line. After all the options have been outputed, output the correction option on a new line. 

    Let the formatting be "Question: ..." then a new line, and then with the possible options beginning with the letter A: "A: ..." then a new line, the "B: ...", etc. 
    At the end, have the answer as "Answer: ..." for each of the questions. Each block of question, options, and answer is separated with 2 new lines.
    '''

def generate_prompt(topic, numQuestions, numOptions, difficulty):
    return f'''Generate a multiple choice quiz of {numQuestions} questions, where there are {numOptions} options for each question, of the difficulty "{difficulty}" from the following prompt: {topic}.
            Also generate the correct answers for each of the questions generated from the prompt.
            Also, generate each option on a new line. After all the options have been outputed, output the correction option on a new line. 

            Let the formatting be "Question: ..." then a new line, and then with the possible options beginning with the letter A: "A: ..." then a new line, the "B: ...", etc. 
            At the end, have the answer as "Answer: ..." for each of the questions. 
            After each group of question, options, and answer, print 2 new lines to separate from the next group. Do not place 2 spaces after the options and before the answer. 
            '''

              

import styles from '../../styles/Cards.module.scss'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Select,
  Button,
  Grid,
  Box,
  Text,
  Flex,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import ImageUploader from '../ImageUploader'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { createCard } from '../../firebase/firestore'
import Divider from '../Divider'

const TextInput = React.forwardRef(function TextInput(props, ref) {
  const error = props.errors.front?.message || props.errors.back?.message
  return (
    <FormControl
      id={props.id}
      isInvalid={error}
      hidden={props.id !== props.cardFace}
    >
      <Textarea
        border={'none'}
        id={props.id}
        placeholder={props.label}
        _placeholder={{ fontSize: 'xl' }}
        {...props}
        ref={ref}
        h={'44vh'}
        maxH={'44vh'}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
})

export default function CardForm() {
  const [triggerAnimation, setTriggerAnimation] = useState(false)
  const [cardFace, setCardFace] = useState('front')
  const [preview, setPreview] = useState(false)
  const previewStyleText = {
    color: 'main.500',
    borderBottom: '2px solid transparent',
    borderColor: 'main.500',
  }
  const router = useRouter()
  const { deckId } = router.query
  const {
    register,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    front: '',
    back: '',
  })
  console.log(errors)
  const onSubmit = async (data) => {
    toast
      .promise(createCard(deckId, data), {
        loading: <b>Creating card...</b>,
        success: <b>Card created!</b>,
        error: <b>Could not create.</b>,
      })
      .then(() => {
        reset({ front: '', back: '', type: 'basic' })
      })
      .catch(() => {})
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        pb={16}
        pt={4}
        px={8}
        h="64vh"
        className={triggerAnimation ? styles.fade_in : ''}
        onAnimationEnd={() => setTriggerAnimation(false)}
        // overflow={'auto'}
      >
        <Flex pl={4} gap={8}>
          <Text
            p={3}
            cursor={'pointer'}
            variant="link"
            {...(!preview ? previewStyleText : {})}
            onClick={() => setPreview(false)}
          >
            Editing {cardFace[0].toUpperCase() + cardFace.substring(1)}
          </Text>
          <Text
            p={3}
            cursor={'pointer'}
            variant="link"
            {...(preview ? previewStyleText : {})}
            onClick={() => setPreview(true)}
          >
            Preview
          </Text>
        </Flex>
        <Divider />
        <TextInput
          {...register('front', {
            required: `Front is required.`,
            maxLength: { value: 1500, message: 'Max length is 1500 char' },
          })}
          errors={errors}
          label={'Start writing'}
          id={'front'}
          cardFace={cardFace}
        />
        <TextInput
          {...register('back', {
            required: `Back is required.`,
            maxLength: { value: 1500, message: 'Max length is 1500 char' },
          })}
          errors={errors}
          label={'Start writing'}
          id={'back'}
          cardFace={cardFace}
        />
      </Box>

      <Grid mx={8} gap={4} templateColumns={'repeat(4, 1fr)'}>
        <FormControl>
          <FormLabel htmlFor="type">Type: </FormLabel>
          <Select id="type" {...register('type')}>
            <option value="basic">Basic</option>
            <option value="Perfect">Perfect</option>
          </Select>
        </FormControl>
        <FormControl isInvalid={errors.image}>
          <FormLabel htmlFor="image">Image: </FormLabel>
          <ImageUploader setError={setError} clearErrors={clearErrors} />
          <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
        </FormControl>
        {/* <GridItem alignSelf="end" colSpan={2}> */}
        <Button
          colorScheme="main"
          alignSelf="end"
          onClick={() =>
            setCardFace((curFace) => (curFace === 'front' ? 'back' : 'front'))
          }
        >
          Show {cardFace === 'front' ? 'Back' : 'Front'}
        </Button>
        <Button colorScheme="main" type="submit" alignSelf="end">
          Create
        </Button>
      </Grid>
    </form>
  )
}

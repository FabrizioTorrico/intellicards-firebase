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
import MarkDown from '../MarkDown'

function TextArea(props) {
  const error = props.errors.front?.message || props.errors.back?.message
  return (
    <FormControl
      id={props.id}
      isInvalid={error}
      hidden={props.id !== props.cardFace}
    >
      {props.preview ? (
        <Box py={2} pl={4} h="70vh" overflow={'auto'}>
          <MarkDown>{props.watch(props.id) || 'Nothing here'}</MarkDown>
        </Box>
      ) : (
        <Textarea
          {...props.register(props.id, {
            required: `${
              props.id[0].toUpperCase() + props.id.substring(1)
            } is required.`,
            maxLength: { value: 1500, message: 'Max length is 1500 char' },
          })}
          border={'none'}
          placeholder={props.label}
          _placeholder={{ fontSize: 'xl' }}
          h={'44vh'}
          maxH={'44vh'}
        />
      )}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}

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
    watch,
    formState: { errors },
  } = useForm({
    front: '# Card Title',
    back: '',
  })

  const changeFace = () =>
    setCardFace((curFace) => (curFace === 'front' ? 'back' : 'front'))

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
      >
        <Flex pl={4} gap={8}>
          <Text
            p={3}
            cursor={'pointer'}
            variant="link"
            {...(!preview ? previewStyleText : {})}
            onClick={() => setPreview(false)}
          >
            {cardFace[0].toUpperCase() + cardFace.substring(1)} text
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
        {['front', 'back'].map((face) => (
          <TextArea
            key={face}
            errors={errors}
            label={'# Start writing'}
            id={face}
            register={register}
            watch={watch}
            cardFace={cardFace}
            preview={preview}
          />
        ))}
      </Box>

      {!preview && (
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
          <Button colorScheme="main" alignSelf="end" onClick={changeFace}>
            Show {cardFace === 'front' ? 'Back' : 'Front'}
          </Button>
          <Button colorScheme="main" type="submit" alignSelf="end">
            Create
          </Button>
        </Grid>
      )}
    </form>
  )
}
